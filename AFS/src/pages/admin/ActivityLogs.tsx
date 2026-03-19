import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Loader2 } from 'lucide-react';

interface ActivityLog {
  _id: string;
  action: string;
  user: string;
  target: string;
  timestamp: string;
  type: 'info' | 'warning' | 'success' | 'error';
}

export default function ActivityLogs() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      setLoading(true);
      const data = await api.getActivityLogs();
      setLogs(data);
    } catch (error) {
      console.error('Failed to load activity logs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-header">Activity Logs</h1>
        <p className="page-subtitle">System-wide activity and audit trail</p>
      </div>

      <div className="glass-card divide-y divide-border">
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center p-8 text-muted-foreground">
            No activity logs found
          </div>
        ) : (
          logs.map(log => (
            <div key={log._id} className="flex items-center gap-4 p-4">
              <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                log.type === 'success' ? 'bg-success' : log.type === 'warning' ? 'bg-warning' : log.type === 'error' ? 'bg-destructive' : 'bg-primary'
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{log.action}</p>
                <p className="text-xs text-muted-foreground">{log.target}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm text-muted-foreground">{log.user}</p>
                <p className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
