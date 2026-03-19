import { useState, useEffect } from 'react';
import { api, Client } from '@/lib/api';
import { StatusBadge } from '@/components/StatusBadge';
import { Loader2 } from 'lucide-react';

export default function MyServer() {
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClient();
  }, []);

  const loadClient = async () => {
    try {
      setLoading(true);
      const data = await api.getMyClientData();
      setClient(data);
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
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="page-header">My Server</h1>
          <p className="page-subtitle">Server data not found</p>
        </div>
      </div>
    );
  }

  const s = client.serverConfig;

  const details = [
    ['CPU', s.cpu],
    ['RAM', s.ram],
    ['Storage', s.storage],
    ['Hosting Service Provider', s.hostingProvider],
    ['Deployment Date', s.deploymentDate],
    ['Estimated Cost', `₹${s.estimatedCost}/mo`],
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-header">My Server</h1>
        <p className="page-subtitle">Your server configuration details</p>
      </div>

      <div className="glass-card p-6 max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-semibold text-foreground">Server Details</h2>
          <StatusBadge status={s.status} />
        </div>
        <div className="space-y-4">
          {details.map(([label, value]) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{label}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
