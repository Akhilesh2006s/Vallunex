import { useState, useEffect } from 'react';
import { api, Client } from '@/lib/api';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Plus, Pencil, Trash2, Loader2, FileText, Repeat, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Project {
  _id: string;
  name: string;
  serverConfig?: {
    cpu: string;
    ram: string;
    storage: string;
    hostingProvider: string;
    estimatedCost: number;
  };
  databaseConfig?: {
    type: string;
    storageSize: string;
    monthlyCost: number;
  };
}

export default function AdminClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [editClient, setEditClient] = useState<Client | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState({
    companyName: '',
    contactEmail: '',
    status: 'Active' as 'Active' | 'Suspended',
    projectIds: [] as string[],
    monthlyCost: 0,
  });
  const [quoteForm, setQuoteForm] = useState({
    invoiceId: '',
    projectId: '',
    billingType: 'single' as 'single' | 'recurring',
    items: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
    extraCost: 0,
    dueDate: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [clientsData, projectsData] = await Promise.all([
        api.getClients(),
        api.getProjects()
      ]);
      setClients(clientsData);
      setProjects(projectsData);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const openNew = () => {
    setEditClient(null);
    setForm({
      companyName: '',
      contactEmail: '',
      status: 'Active',
      projectIds: [],
      monthlyCost: 0,
    });
    setDialogOpen(true);
  };

  const openEdit = (c: Client) => {
    setEditClient(c);
    // Handle both new (projectIds) and legacy (projectId) formats
    const projectIds = (c as any).projectIds || [];
    const legacyProjectId = (c as any).projectId?._id || (c as any).projectId;
    const finalProjectIds = projectIds.length > 0 
      ? projectIds.map((p: any) => typeof p === 'string' ? p : p._id || p)
      : legacyProjectId ? [legacyProjectId] : [];
    
    setForm({
      companyName: c.companyName,
      contactEmail: c.contactEmail,
      status: c.status,
      projectIds: finalProjectIds,
      monthlyCost: c.monthlyCost,
    });
    setDialogOpen(true);
  };

  const openQuote = (c: Client) => {
    setSelectedClient(c);
    // Get first project for auto-fill (if multiple, use first one)
    const projectIds = (c as any).projectIds || [];
    const legacyProjectId = (c as any).projectId?._id || (c as any).projectId;
    const firstProjectId = projectIds.length > 0 
      ? (typeof projectIds[0] === 'string' ? projectIds[0] : projectIds[0]._id || projectIds[0])
      : legacyProjectId || '';
    
    setQuoteForm({
      invoiceId: `INV-${Date.now()}`,
      projectId: firstProjectId,
      billingType: 'single',
      items: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
      extraCost: 0,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });
    setQuoteDialogOpen(true);
    // Auto-fill if client has a project
    if (firstProjectId) {
      handleProjectChangeForQuote(firstProjectId);
    }
  };

  const handleProjectChangeForQuote = (projectId: string) => {
    if (!projectId) {
      setQuoteForm(f => ({ ...f, projectId: '' }));
      return;
    }
    
    setQuoteForm(f => ({ ...f, projectId }));
    
    const project = projects.find(p => p._id === projectId);
    if (project && project.serverConfig && project.databaseConfig) {
      const newItems = [];
      
      // Add Server item
      if (project.serverConfig) {
        newItems.push({
          description: `Server - ${project.serverConfig.cpu} / ${project.serverConfig.ram} / ${project.serverConfig.storage} (${project.serverConfig.hostingProvider})`,
          quantity: 1,
          rate: project.serverConfig.estimatedCost || 0,
          amount: project.serverConfig.estimatedCost || 0,
        });
      }
      
      // Add Database item
      if (project.databaseConfig) {
        newItems.push({
          description: `Database - ${project.databaseConfig.type} (${project.databaseConfig.storageSize})`,
          quantity: 1,
          rate: project.databaseConfig.monthlyCost || 0,
          amount: project.databaseConfig.monthlyCost || 0,
        });
      }
      
      setQuoteForm(f => ({ ...f, items: newItems.length > 0 ? newItems : f.items }));
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      if (editClient) {
        await api.updateClient(editClient._id, {
          companyName: form.companyName,
          contactEmail: form.contactEmail,
          status: form.status,
          monthlyCost: form.monthlyCost,
          projectIds: form.projectIds,
        });
        toast({
          title: 'Success',
          description: 'Client updated successfully',
        });
      } else {
        await api.createClient({
          companyName: form.companyName,
          contactEmail: form.contactEmail,
          planType: 'Starter',
          projectIds: form.projectIds,
        });
        toast({
          title: 'Success',
          description: 'Client created successfully',
        });
      }
      setDialogOpen(false);
      loadData();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save client',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCreateQuote = async () => {
    if (!selectedClient) return;
    try {
      setSaving(true);
      const itemsTotal = quoteForm.items.reduce((sum, item) => sum + item.amount, 0);
      const total = itemsTotal + quoteForm.extraCost;
      await api.createInvoice({
        invoiceId: quoteForm.invoiceId,
        clientId: selectedClient._id,
        projectId: quoteForm.projectId || undefined,
        items: quoteForm.items,
        extraCost: quoteForm.extraCost,
        billingType: quoteForm.billingType,
        total,
        dueDate: quoteForm.dueDate,
      });
      toast({
        title: 'Success',
        description: 'Billing quote created successfully',
      });
      setQuoteDialogOpen(false);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create quote',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this client?')) return;
    try {
      await api.deleteClient(id);
      toast({
        title: 'Success',
        description: 'Client deleted successfully',
      });
      loadData();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete client',
        variant: 'destructive',
      });
    }
  };

  const updateQuoteItem = (index: number, field: string, value: any) => {
    const newItems = [...quoteForm.items];
    newItems[index] = { ...newItems[index], [field]: value };
    if (field === 'quantity' || field === 'rate') {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
    }
    setQuoteForm({ ...quoteForm, items: newItems });
  };

  const addQuoteItem = () => {
    setQuoteForm({
      ...quoteForm,
      items: [...quoteForm.items, { description: '', quantity: 1, rate: 0, amount: 0 }],
    });
  };

  const removeQuoteItem = (index: number) => {
    setQuoteForm({
      ...quoteForm,
      items: quoteForm.items.filter((_, i) => i !== index),
    });
  };

  const getProjectNames = (client: Client) => {
    // Handle both new (projectIds) and legacy (projectId) formats
    const projectIds = (client as any).projectIds || [];
    const legacyProjectId = (client as any).projectId?._id || (client as any).projectId;
    
    let allProjectIds: string[] = [];
    if (projectIds.length > 0) {
      allProjectIds = projectIds.map((p: any) => typeof p === 'string' ? p : p._id || p);
    } else if (legacyProjectId) {
      allProjectIds = [legacyProjectId];
    }
    
    if (allProjectIds.length === 0) return '—';
    
    const projectNames = allProjectIds
      .map(id => {
        const project = projects.find(p => p._id === id);
        return project?.name;
      })
      .filter(Boolean);
    
    return projectNames.length > 0 ? projectNames.join(', ') : '—';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">Clients</h1>
          <p className="page-subtitle">Manage client accounts and assign to projects</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew}><Plus className="h-4 w-4 mr-2" />Add Client</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editClient ? 'Edit Client' : 'Add New Client'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company Name *</Label>
                  <Input
                    value={form.companyName}
                    onChange={e => setForm(f => ({ ...f, companyName: e.target.value }))}
                    placeholder="Enter company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Contact Email *</Label>
                  <Input
                    type="email"
                    value={form.contactEmail}
                    onChange={e => setForm(f => ({ ...f, contactEmail: e.target.value }))}
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v as any }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Monthly Cost (₹)</Label>
                  <Input
                    type="number"
                    value={form.monthlyCost}
                    onChange={e => setForm(f => ({ ...f, monthlyCost: parseFloat(e.target.value) || 0 }))}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Assign to Projects (Optional - Multiple Selection)</Label>
                <div className="border border-border rounded-md p-3 max-h-48 overflow-y-auto">
                  {projects.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No projects available</p>
                  ) : (
                    <div className="space-y-2">
                      {projects.map(p => (
                        <div key={p._id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`project-${p._id}`}
                            checked={form.projectIds.includes(p._id)}
                            onChange={e => {
                              if (e.target.checked) {
                                setForm(f => ({ ...f, projectIds: [...f.projectIds, p._id] }));
                              } else {
                                setForm(f => ({ ...f, projectIds: f.projectIds.filter(id => id !== p._id) }));
                              }
                            }}
                            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                          />
                          <Label htmlFor={`project-${p._id}`} className="text-sm font-normal cursor-pointer">
                            {p.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {form.projectIds.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {form.projectIds.length} project(s) selected
                  </p>
                )}
              </div>
              <Button onClick={handleSave} className="w-full mt-2" disabled={saving || !form.companyName.trim() || !form.contactEmail.trim()}>
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  editClient ? 'Save Changes' : 'Create Client'
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="glass-card">
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : clients.length === 0 ? (
          <div className="text-center p-8 text-muted-foreground">
            No clients found. Click "Add Client" to create your first client.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Project</TableHead>
                <TableHead className="text-right">Cost/mo</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map(c => (
                <TableRow key={c._id}>
                  <TableCell className="font-medium">{c.companyName}</TableCell>
                  <TableCell className="text-muted-foreground">{c.contactEmail}</TableCell>
                  <TableCell><StatusBadge status={c.status} /></TableCell>
                  <TableCell className="text-muted-foreground">{getProjectNames(c)}</TableCell>
                  <TableCell className="text-right font-medium">₹{c.monthlyCost}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(c)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openQuote(c)} title="Create Billing Quote">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(c._id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Billing Quote Dialog */}
      <Dialog open={quoteDialogOpen} onOpenChange={setQuoteDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Create Billing Quote for {selectedClient?.companyName}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            {/* Invoice Header */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Invoice ID *</Label>
                <Input
                  value={quoteForm.invoiceId}
                  onChange={e => setQuoteForm(f => ({ ...f, invoiceId: e.target.value }))}
                  placeholder="INV-2026-001"
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Due Date *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    value={quoteForm.dueDate}
                    onChange={e => setQuoteForm(f => ({ ...f, dueDate: e.target.value }))}
                    className="h-10 pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Billing Type */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Billing Type *</Label>
              <RadioGroup
                value={quoteForm.billingType}
                onValueChange={(v: 'single' | 'recurring') => setQuoteForm(f => ({ ...f, billingType: v }))}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="single" id="quote-single" />
                  <Label htmlFor="quote-single" className="font-normal cursor-pointer">Single Month</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="recurring" id="quote-recurring" />
                  <Label htmlFor="quote-recurring" className="font-normal cursor-pointer flex items-center gap-1">
                    <Repeat className="h-4 w-4" />
                    Recurring Monthly
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Project Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Project (Optional - Auto-fills Server & Database)</Label>
              <Select value={quoteForm.projectId || undefined} onValueChange={handleProjectChangeForQuote}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select a project to auto-fill items" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map(p => (
                    <SelectItem key={p._id} value={p._id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {quoteForm.projectId && (
                <p className="text-xs text-muted-foreground">
                  Server and Database items have been auto-populated from the selected project
                </p>
              )}
            </div>

            {/* Invoice Items */}
            <div className="space-y-4 border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">Invoice Items</Label>
                <Button type="button" variant="outline" size="sm" onClick={addQuoteItem}>
                  <Plus className="h-4 w-4 mr-1" />Add Item
                </Button>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground pb-2 border-b">
                  <div className="col-span-5">Description</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Rate (₹)</div>
                  <div className="col-span-2 text-center">Amount (₹)</div>
                  <div className="col-span-1"></div>
                </div>
                {quoteForm.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 items-end">
                    <div className="col-span-5">
                      <Input
                        placeholder="Item description"
                        value={item.description}
                        onChange={e => updateQuoteItem(index, 'description', e.target.value)}
                        className="h-9"
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={e => updateQuoteItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                        className="h-9"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        placeholder="Rate"
                        value={item.rate}
                        onChange={e => updateQuoteItem(index, 'rate', parseFloat(e.target.value) || 0)}
                        className="h-9"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        placeholder="Amount"
                        value={item.amount}
                        readOnly
                        className="bg-muted h-9 font-medium"
                      />
                    </div>
                    <div className="col-span-1">
                      {quoteForm.items.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeQuoteItem(index)}
                          className="h-9 w-9"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Subtotal and Extra Cost */}
              <div className="border-t border-border pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{quoteForm.items.reduce((sum, item) => sum + item.amount, 0).toLocaleString('en-IN')}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-semibold">Extra Cost</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={quoteForm.extraCost}
                      onChange={e => setQuoteForm(f => ({ ...f, extraCost: parseFloat(e.target.value) || 0 }))}
                      placeholder="0"
                      className="w-32 h-9"
                      min="0"
                      step="0.01"
                    />
                    <span className="text-sm text-muted-foreground">₹</span>
                  </div>
                </div>
                
                <div className="border-t border-border pt-3 flex justify-between items-center">
                  <span className="text-base font-bold">Grand Total</span>
                  <span className="text-lg font-bold text-primary">₹{(quoteForm.items.reduce((sum, item) => sum + item.amount, 0) + quoteForm.extraCost).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <Button onClick={handleCreateQuote} className="w-full h-11" disabled={saving || !quoteForm.invoiceId || !quoteForm.dueDate}>
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating Invoice...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-2" />
                  Create Billing Quote
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
