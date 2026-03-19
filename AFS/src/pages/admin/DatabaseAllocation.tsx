import { useState, useEffect } from 'react';
import { api, Client } from '@/lib/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2 } from 'lucide-react';

export default function DatabaseAllocation() {
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
        <h1 className="page-header">Database Allocation</h1>
        <p className="page-subtitle">Manage database configurations across clients</p>
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
                <TableHead>Database Type</TableHead>
                <TableHead>Storage Size</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Backup</TableHead>
                <TableHead className="text-right">Cost/mo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map(c => (
                <TableRow key={c._id}>
                  <TableCell className="font-medium">{c.companyName}</TableCell>
                  <TableCell>{c.databaseConfig.type}</TableCell>
                  <TableCell>{c.databaseConfig.storageSize}</TableCell>
                  <TableCell className="text-muted-foreground">{c.databaseConfig.region}</TableCell>
                  <TableCell>
                    <span className={c.databaseConfig.backupEnabled ? 'text-success' : 'text-destructive'}>
                      {c.databaseConfig.backupEnabled ? 'Yes' : 'No'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium">₹{c.databaseConfig.monthlyCost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
