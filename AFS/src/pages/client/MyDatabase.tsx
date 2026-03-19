import { useState, useEffect } from 'react';
import { api, Client } from '@/lib/api';
import { Loader2 } from 'lucide-react';

export default function MyDatabase() {
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
          <h1 className="page-header">My Database</h1>
          <p className="page-subtitle">Database data not found</p>
        </div>
      </div>
    );
  }

  const d = client.databaseConfig;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-header">My Database</h1>
        <p className="page-subtitle">Your database configuration</p>
      </div>

      <div className="glass-card p-6 max-w-lg">
        <h2 className="text-sm font-semibold text-foreground mb-6">Database Details</h2>
        <div className="space-y-4">
          {[
            ['Database Type', d.type],
            ['Storage Size', d.storageSize],
            ['Region', d.region],
            ['Backup Status', d.backupEnabled ? 'Enabled' : 'Disabled'],
            ['Monthly Cost', `₹${d.monthlyCost}/mo`],
          ].map(([label, value]) => (
            <div key={label as string} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{label}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
