import { useState, useEffect } from 'react';
import { api, Client } from '@/lib/api';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Download, Eye, Loader2, Plus, Trash2, FileText, Calendar, Repeat } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Invoice {
  _id: string;
  invoiceId: string;
  clientId: string | { _id: string; companyName: string; contactEmail: string };
  items?: Array<{
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }>;
  breakdown: {
    baseInfrastructure: number;
    maintenance: number;
    aiUsage: number;
  };
  total: number;
  status: 'Pending' | 'Paid' | 'Overdue';
  dueDate: string;
  createdAt: string;
}

interface Project {
  _id: string;
  name: string;
  serverConfig: {
    cpu: string;
    ram: string;
    storage: string;
    hostingProvider: string;
    estimatedCost: number;
  };
  databaseConfig: {
    type: string;
    storageSize: string;
    monthlyCost: number;
  };
}

export default function AdminBilling() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState({
    invoiceId: '',
    clientId: '',
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
      const [invoicesData, clientsData, projectsData] = await Promise.all([
        api.getInvoices(),
        api.getClients(),
        api.getProjects()
      ]);
      setInvoices(invoicesData);
      setClients(clientsData);
      setProjects(projectsData);
    } catch (error) {
      console.error('Failed to load data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load invoices',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const openNew = () => {
    setForm({
      invoiceId: `INV-${Date.now()}`,
      clientId: '',
      projectId: '',
      billingType: 'single',
      items: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
      extraCost: 0,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });
    setDialogOpen(true);
  };

  const handleProjectChange = (projectId: string) => {
    if (!projectId) {
      setForm(f => ({ ...f, projectId: '' }));
      return;
    }
    
    setForm(f => ({ ...f, projectId }));
    
    const project = projects.find(p => p._id === projectId);
    if (project) {
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
      
      setForm(f => ({ ...f, items: newItems.length > 0 ? newItems : f.items }));
    }
  };

  const handleCreateInvoice = async () => {
    if (!form.clientId || !form.invoiceId || !form.dueDate) {
      toast({
        title: 'Error',
        description: 'Please fill all required fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      setSaving(true);
      const itemsTotal = form.items.reduce((sum, item) => sum + item.amount, 0);
      const total = itemsTotal + form.extraCost;
      
      await api.createInvoice({
        invoiceId: form.invoiceId,
        clientId: form.clientId,
        projectId: form.projectId || undefined,
        items: form.items,
        extraCost: form.extraCost,
        billingType: form.billingType,
        total,
        dueDate: form.dueDate,
      });
      toast({
        title: 'Success',
        description: 'Invoice created successfully',
      });
      setDialogOpen(false);
      loadData();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create invoice',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...form.items];
    newItems[index] = { ...newItems[index], [field]: value };
    if (field === 'quantity' || field === 'rate') {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
    }
    setForm({ ...form, items: newItems });
  };

  const addItem = () => {
    setForm({
      ...form,
      items: [...form.items, { description: '', quantity: 1, rate: 0, amount: 0 }],
    });
  };

  const removeItem = (index: number) => {
    setForm({
      ...form,
      items: form.items.filter((_, i) => i !== index),
    });
  };

  const getClientName = (clientId: string | { _id: string; companyName: string; contactEmail: string }) => {
    if (typeof clientId === 'object') {
      return clientId.companyName;
    }
    return 'Unknown';
  };

  const getSelectedClient = () => {
    return clients.find(c => c._id === form.clientId);
  };

  const getClientProjects = () => {
    if (!form.clientId) return [];
    const client = getSelectedClient();
    if (!client) return [];
    const clientProjectId = (client as any).projectId?._id || (client as any).projectId;
    if (!clientProjectId) return [];
    return projects.filter(p => p._id === clientProjectId);
  };

  const itemsTotal = form.items.reduce((sum, item) => sum + item.amount, 0);
  const grandTotal = itemsTotal + form.extraCost;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">Billing Management</h1>
          <p className="page-subtitle">View invoices and manage billing across all clients</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew}><Plus className="h-4 w-4 mr-2" />Add Invoice</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Create New Invoice</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              {/* Invoice Header */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Invoice ID *</Label>
                  <Input
                    value={form.invoiceId}
                    onChange={e => setForm(f => ({ ...f, invoiceId: e.target.value }))}
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
                      value={form.dueDate}
                      onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))}
                      className="h-10 pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Client Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Client *</Label>
                <Select value={form.clientId} onValueChange={v => setForm(f => ({ ...f, clientId: v, projectId: '' }))}>
                  <SelectTrigger className="h-10"><SelectValue placeholder="Select a client" /></SelectTrigger>
                  <SelectContent>
                    {clients.map(c => (
                      <SelectItem key={c._id} value={c._id}>{c.companyName}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Billing Type */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Billing Type *</Label>
                <RadioGroup
                  value={form.billingType}
                  onValueChange={(v: 'single' | 'recurring') => setForm(f => ({ ...f, billingType: v }))}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="single" id="single" />
                    <Label htmlFor="single" className="font-normal cursor-pointer">Single Month</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="recurring" id="recurring" />
                    <Label htmlFor="recurring" className="font-normal cursor-pointer flex items-center gap-1">
                      <Repeat className="h-4 w-4" />
                      Recurring Monthly
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Project Selection */}
              {form.clientId && (
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Project (Optional - Auto-fills Server & Database)</Label>
                  <Select value={form.projectId || undefined} onValueChange={handleProjectChange}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select a project to auto-fill items" />
                    </SelectTrigger>
                    <SelectContent>
                      {getClientProjects().map(p => (
                        <SelectItem key={p._id} value={p._id}>{p.name}</SelectItem>
                      ))}
                      {projects.filter(p => !getClientProjects().some(cp => cp._id === p._id)).map(p => (
                        <SelectItem key={p._id} value={p._id}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.projectId && (
                    <p className="text-xs text-muted-foreground">
                      Server and Database items have been auto-populated from the selected project
                    </p>
                  )}
                </div>
              )}

              {/* Invoice Items */}
              <div className="space-y-4 border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold">Invoice Items</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addItem}>
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
                  {form.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 items-end">
                      <div className="col-span-5">
                        <Input
                          placeholder="Item description"
                          value={item.description}
                          onChange={e => updateItem(index, 'description', e.target.value)}
                          className="h-9"
                        />
                      </div>
                      <div className="col-span-2">
                        <Input
                          type="number"
                          placeholder="Qty"
                          value={item.quantity}
                          onChange={e => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
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
                          onChange={e => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
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
                        {form.items.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(index)}
                            className="h-9 w-9"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Subtotal */}
                <div className="border-t border-border pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{itemsTotal.toLocaleString('en-IN')}</span>
                  </div>
                  
                  {/* Extra Cost */}
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-semibold">Extra Cost</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={form.extraCost}
                        onChange={e => setForm(f => ({ ...f, extraCost: parseFloat(e.target.value) || 0 }))}
                        placeholder="0"
                        className="w-32 h-9"
                        min="0"
                        step="0.01"
                      />
                      <span className="text-sm text-muted-foreground">₹</span>
                    </div>
                  </div>
                  
                  {/* Grand Total */}
                  <div className="border-t border-border pt-3 flex justify-between items-center">
                    <span className="text-base font-bold">Grand Total</span>
                    <span className="text-lg font-bold text-primary">₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Create Button */}
              <Button onClick={handleCreateInvoice} className="w-full h-11" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating Invoice...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    Create Invoice
                  </>
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
        ) : invoices.length === 0 ? (
          <div className="text-center p-8 text-muted-foreground">
            No invoices found
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map(inv => (
                <TableRow key={inv._id}>
                  <TableCell className="font-mono text-sm">{inv.invoiceId}</TableCell>
                  <TableCell className="font-medium">{getClientName(inv.clientId)}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {(inv as any).billingType === 'recurring' ? (
                      <span className="flex items-center gap-1">
                        <Repeat className="h-3 w-3" />
                        Recurring
                      </span>
                    ) : (
                      'Single'
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {inv.items && inv.items.length > 0 ? (
                      <span>{inv.items.length} item(s)</span>
                    ) : (
                      <span>3 items</span>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">₹{inv.total.toLocaleString('en-IN')}</TableCell>
                  <TableCell className="text-muted-foreground">{new Date(inv.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell><StatusBadge status={inv.status} /></TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => setSelectedInvoice(inv)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Invoice {inv.invoiceId}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Client</span>
                            <span className="font-medium">{getClientName(inv.clientId)}</span>
                          </div>
                          {inv.items && inv.items.length > 0 ? (
                            <div className="border-t border-border pt-4 space-y-2">
                              {inv.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">{item.description}</span>
                                  <span>₹{item.amount.toLocaleString('en-IN')} ({item.quantity} × ₹{item.rate.toLocaleString('en-IN')})</span>
                                </div>
                              ))}
                              {(inv as any).extraCost > 0 && (
                                <div className="flex justify-between text-sm pt-2 border-t">
                                  <span className="text-muted-foreground">Extra Cost</span>
                                  <span>₹{(inv as any).extraCost.toLocaleString('en-IN')}</span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="border-t border-border pt-4 space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Base Infrastructure</span>
                                <span>₹{inv.breakdown.baseInfrastructure}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Maintenance</span>
                                <span>₹{inv.breakdown.maintenance}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">AI Usage</span>
                                <span>₹{inv.breakdown.aiUsage}</span>
                              </div>
                            </div>
                          )}
                          <div className="border-t border-border pt-4 flex justify-between font-semibold">
                            <span>Total</span>
                            <span>₹{inv.total.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Status</span>
                            <StatusBadge status={inv.status} />
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        )}
      </div>
    </div>
  );
}
