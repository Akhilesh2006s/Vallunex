import { useState, useEffect } from 'react';
import { api, Client } from '@/lib/api';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Pencil, Trash2, Loader2, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Project {
  _id: string;
  name: string;
  description: string;
  clients: Array<{ _id: string; companyName: string; contactEmail: string; status: string }>;
  serverConfig: {
    cpu: string;
    ram: string;
    storage: string;
    hostingProvider: 'AmenityForge' | 'AWS' | 'DigitalOcean' | 'GCP' | 'Custom';
    estimatedCost: number;
    deploymentDate: string;
    status: 'Active' | 'Provisioning' | 'Stopped';
  };
  databaseConfig: {
    type: 'MongoDB Atlas' | 'MySQL' | 'PostgreSQL';
    storageSize: string;
    region: string;
    monthlyCost: number;
    backupEnabled: boolean;
    connectionString?: string;
  };
  status: 'Active' | 'Inactive';
  createdAt: string;
  updatedAt: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: '',
    description: '',
    status: 'Active' as 'Active' | 'Inactive',
    cpu: '2 vCPU',
    ram: '4GB',
    storage: '80GB SSD',
    hostingProvider: 'AmenityForge' as 'AmenityForge' | 'AWS' | 'DigitalOcean' | 'GCP' | 'Custom',
    dbType: 'MongoDB Atlas' as 'MongoDB Atlas' | 'MySQL' | 'PostgreSQL',
    dbStorageSize: '10GB',
    dbRegion: 'us-east-1',
    dbConnectionString: '',
    selectedClients: [] as string[],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [projectsData, clientsData] = await Promise.all([
        api.getProjects(),
        api.getClients()
      ]);
      setProjects(projectsData);
      setClients(clientsData);
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
    setEditProject(null);
    setForm({
      name: '',
      description: '',
      status: 'Active',
      cpu: '2 vCPU',
      ram: '4GB',
      storage: '80GB SSD',
      hostingProvider: 'AmenityForge',
      dbType: 'MongoDB Atlas',
      dbStorageSize: '10GB',
      dbRegion: 'us-east-1',
      dbConnectionString: '',
      selectedClients: [],
    });
    setDialogOpen(true);
  };

  const openEdit = (p: Project) => {
    setEditProject(p);
    setForm({
      name: p.name,
      description: p.description,
      status: p.status,
      cpu: p.serverConfig.cpu,
      ram: p.serverConfig.ram,
      storage: p.serverConfig.storage,
      hostingProvider: p.serverConfig.hostingProvider,
      dbType: p.databaseConfig.type,
      dbStorageSize: p.databaseConfig.storageSize,
      dbRegion: p.databaseConfig.region,
      dbConnectionString: p.databaseConfig.connectionString || '',
      selectedClients: p.clients.map(c => c._id),
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const serverConfig = {
        cpu: form.cpu,
        ram: form.ram,
        storage: form.storage,
        hostingProvider: form.hostingProvider,
      };

      const databaseConfig = {
        type: form.dbType,
        storageSize: form.dbStorageSize,
        region: form.dbRegion,
        connectionString: form.dbConnectionString,
      };

      if (editProject) {
        await api.updateProject(editProject._id, {
          name: form.name,
          description: form.description,
          status: form.status,
          serverConfig,
          databaseConfig,
          clientIds: form.selectedClients,
        });
        toast({
          title: 'Success',
          description: 'Project updated successfully',
        });
      } else {
        await api.createProject({
          name: form.name,
          description: form.description,
          serverConfig,
          databaseConfig,
          clientIds: form.selectedClients,
        });
        toast({
          title: 'Success',
          description: 'Project created successfully',
        });
      }
      setDialogOpen(false);
      loadData();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save project',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.deleteProject(id);
      toast({
        title: 'Success',
        description: 'Project deleted successfully',
      });
      loadData();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete project',
        variant: 'destructive',
      });
    }
  };

  const toggleClient = (clientId: string) => {
    setForm(prev => ({
      ...prev,
      selectedClients: prev.selectedClients.includes(clientId)
        ? prev.selectedClients.filter(id => id !== clientId)
        : [...prev.selectedClients, clientId]
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">Projects</h1>
          <p className="page-subtitle">Manage projects and assign clients to them</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew}><Plus className="h-4 w-4 mr-2" />Add Project</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="space-y-2">
                <Label>Project Name *</Label>
                <Input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Enter project name"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Enter project description"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v as any }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border-t border-border pt-4">
                <h3 className="text-sm font-semibold mb-3">Server Configuration</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>CPU</Label>
                    <Input value={form.cpu} onChange={e => setForm(f => ({ ...f, cpu: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>RAM</Label>
                    <Input value={form.ram} onChange={e => setForm(f => ({ ...f, ram: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Storage</Label>
                    <Input value={form.storage} onChange={e => setForm(f => ({ ...f, storage: e.target.value }))} />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Label>Hosting Service Provider</Label>
                  <Select value={form.hostingProvider} onValueChange={v => setForm(f => ({ ...f, hostingProvider: v as any }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AmenityForge">AmenityForge</SelectItem>
                      <SelectItem value="AWS">AWS</SelectItem>
                      <SelectItem value="DigitalOcean">DigitalOcean</SelectItem>
                      <SelectItem value="GCP">GCP</SelectItem>
                      <SelectItem value="Custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h3 className="text-sm font-semibold mb-3">Database Configuration</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Database Type</Label>
                    <Select value={form.dbType} onValueChange={v => setForm(f => ({ ...f, dbType: v as any }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MongoDB Atlas">MongoDB Atlas</SelectItem>
                        <SelectItem value="MySQL">MySQL</SelectItem>
                        <SelectItem value="PostgreSQL">PostgreSQL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Storage Size</Label>
                    <Input value={form.dbStorageSize} onChange={e => setForm(f => ({ ...f, dbStorageSize: e.target.value }))} />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Label>Region</Label>
                  <Input value={form.dbRegion} onChange={e => setForm(f => ({ ...f, dbRegion: e.target.value }))} />
                </div>
                <div className="mt-4 space-y-2">
                  <Label>Connection String (Optional)</Label>
                  <Input
                    value={form.dbConnectionString}
                    onChange={e => setForm(f => ({ ...f, dbConnectionString: e.target.value }))}
                    placeholder="mongodb+srv://..."
                    type="password"
                  />
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h3 className="text-sm font-semibold mb-3">Assign Clients</h3>
                <div className="max-h-48 overflow-y-auto border border-border rounded-lg p-3 space-y-2">
                  {clients.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">No clients available</p>
                  ) : (
                    clients.map(client => (
                      <div key={client._id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`client-${client._id}`}
                          checked={form.selectedClients.includes(client._id)}
                          onCheckedChange={() => toggleClient(client._id)}
                        />
                        <Label
                          htmlFor={`client-${client._id}`}
                          className="text-sm font-normal cursor-pointer flex-1"
                        >
                          {client.companyName} ({client.contactEmail})
                        </Label>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <Button onClick={handleSave} className="w-full mt-2" disabled={saving || !form.name.trim()}>
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  editProject ? 'Save Changes' : 'Create Project'
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
        ) : projects.length === 0 ? (
          <div className="text-center p-8 text-muted-foreground">
            No projects found. Click "Add Project" to create your first project.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Clients</TableHead>
                <TableHead>Server</TableHead>
                <TableHead>Database</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map(p => (
                <TableRow key={p._id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs truncate">{p.description || '—'}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{p.clients.length}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {p.serverConfig.cpu} / {p.serverConfig.ram}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{p.databaseConfig.type}</TableCell>
                  <TableCell><StatusBadge status={p.status} /></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(p)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(p._id)}>
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
    </div>
  );
}
