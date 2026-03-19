import { useState, useEffect } from 'react';
import { api, Client } from '@/lib/api';
import { StatusBadge } from '@/components/StatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2 } from 'lucide-react';

export default function ServerAllocation() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      setLoading(true);
      const data = await api.getClients();
      setClients(data);
    } catch (error) {
      console.error('Failed to load clients:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-header">Server Allocation</h1>
        <p className="page-subtitle">View and manage server configurations for all clients</p>
      </div>

      <div className="glass-card">
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : clients.length === 0 ? (
          <div className="text-center p-8 text-muted-foreground">
            No clients found
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Server Type</TableHead>
                <TableHead>Hosting Service Provider</TableHead>
                <TableHead>Deployment Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Est. Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map(c => (
                <TableRow key={c._id}>
                  <TableCell className="font-medium">{c.companyName}</TableCell>
                  <TableCell>{c.serverConfig.cpu} / {c.serverConfig.ram} / {c.serverConfig.storage}</TableCell>
                  <TableCell>{c.serverConfig.hostingProvider}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(c.serverConfig.deploymentDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell><StatusBadge status={c.serverConfig.status} /></TableCell>
                  <TableCell className="text-right font-medium">₹{c.serverConfig.estimatedCost}/mo</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
