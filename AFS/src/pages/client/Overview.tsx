import { useState, useEffect } from 'react';
import { api, Client } from '@/lib/api';
import { StatsCard } from '@/components/StatsCard';
import { StatusBadge } from '@/components/StatusBadge';
import { Server, Database, DollarSign, Calendar, Loader2 } from 'lucide-react';

interface Invoice {
  _id: string;
  invoiceId: string;
  clientId: string;
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

export default function ClientOverview() {
  const [client, setClient] = useState<Client | null>(null);
  const [latestInvoice, setLatestInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [clientData, invoiceData] = await Promise.all([
        api.getMyClientData(),
        api.getMyLatestInvoice()
      ]);
      setClient(clientData);
      setLatestInvoice(invoiceData);
    } catch (error) {
      console.error('Failed to load client data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="page-header">Welcome back</h1>
          <p className="page-subtitle">Client data not found</p>
        </div>
      </div>
    );
  }

  const nextBilling = latestInvoice?.dueDate ? new Date(latestInvoice.dueDate).toLocaleDateString() : 'N/A';

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="page-header">Welcome back</h1>
        <p className="page-subtitle">{client.companyName} — {client.planType} Plan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Server Config" value={`${client.serverConfig.cpu}`} icon={Server} variant="primary" change={`${client.serverConfig.ram} · ${client.serverConfig.storage}`} />
        <StatsCard title="Database" value={client.databaseConfig.type} icon={Database} variant="default" change={client.databaseConfig.storageSize} />
        <StatsCard title="Monthly Cost" value={`₹${client.monthlyCost}`} icon={DollarSign} variant="success" />
        <StatsCard title="Next Billing" value={nextBilling} icon={Calendar} variant="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h2 className="text-sm font-semibold text-foreground mb-4">Server Configuration</h2>
          <div className="space-y-3 text-sm">
            {[
              ['CPU', client.serverConfig.cpu],
              ['RAM', client.serverConfig.ram],
              ['Storage', client.serverConfig.storage],
              ['Hosting Service Provider', client.serverConfig.hostingProvider],
              ['Status', null],
            ].map(([label, value]) => (
              <div key={label as string} className="flex justify-between">
                <span className="text-muted-foreground">{label}</span>
                {value ? <span className="font-medium">{value}</span> : <StatusBadge status={client.serverConfig.status} />}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-sm font-semibold text-foreground mb-4">Database Configuration</h2>
          <div className="space-y-3 text-sm">
            {[
              ['Type', client.databaseConfig.type],
              ['Storage', client.databaseConfig.storageSize],
              ['Region', client.databaseConfig.region],
              ['Backup', client.databaseConfig.backupEnabled ? 'Enabled' : 'Disabled'],
              ['Monthly Cost', `₹${client.databaseConfig.monthlyCost}`],
            ].map(([label, value]) => (
              <div key={label as string} className="flex justify-between">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {latestInvoice && (
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">Current Invoice</h2>
            <StatusBadge status={latestInvoice.status} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Invoice ID</p>
              <p className="font-mono font-medium">{latestInvoice.invoiceId}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total</p>
              <p className="font-medium">₹{latestInvoice.total}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Due Date</p>
              <p className="font-medium">{new Date(latestInvoice.dueDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Created</p>
              <p className="font-medium">{new Date(latestInvoice.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
