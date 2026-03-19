import { useState, useEffect } from 'react';
import { Users, Server, DollarSign, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { StatsCard } from '@/components/StatsCard';
import { StatusBadge } from '@/components/StatusBadge';
import { api, Client } from '@/lib/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DashboardStats {
  totalClients: number;
  clientsThisMonth: number;
  activeServers: number;
  activeClients: number;
  monthlyRevenue: number;
  revenueChange: string | null;
  pendingPayments: number;
  verifiedPayments: number;
}

interface ActivityLog {
  _id: string;
  action: string;
  user: string;
  target: string;
  timestamp: string;
  type: 'info' | 'warning' | 'success' | 'error';
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentClients, setRecentClients] = useState<Client[]>([]);
  const [recentActivity, setRecentActivity] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, clientsData, activityData] = await Promise.all([
        api.getDashboardStats(),
        api.getRecentClients(),
        api.getRecentActivity()
      ]);
      setStats(statsData);
      setRecentClients(clientsData);
      setRecentActivity(activityData);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
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

  if (!stats) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="page-header">Dashboard</h1>
          <p className="page-subtitle">Overview of your infrastructure management</p>
        </div>
        <div className="text-center text-muted-foreground">Failed to load dashboard data</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="page-header">Dashboard</h1>
        <p className="page-subtitle">Overview of your infrastructure management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard 
          title="Total Clients" 
          value={stats.totalClients} 
          icon={Users} 
          variant="primary" 
          change={stats.clientsThisMonth > 0 ? `+${stats.clientsThisMonth} this month` : undefined} 
        />
        <StatsCard 
          title="Active Servers" 
          value={stats.activeServers} 
          icon={Server} 
          variant="success" 
        />
        <StatsCard 
          title="Monthly Revenue" 
          value={`₹${stats.monthlyRevenue.toLocaleString()}`} 
          icon={DollarSign} 
          variant="success" 
          change={stats.revenueChange || undefined} 
        />
        <StatsCard 
          title="Pending Payments" 
          value={stats.pendingPayments} 
          icon={Clock} 
          variant="warning" 
        />
        <StatsCard 
          title="Verified Payments" 
          value={stats.verifiedPayments} 
          icon={CheckCircle} 
          variant="default" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Clients */}
        <div className="glass-card">
          <div className="p-4 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">Recent Clients</h2>
          </div>
          {recentClients.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm">
              No clients found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentClients.map(client => (
                  <TableRow key={client._id}>
                    <TableCell className="font-medium">{client.companyName}</TableCell>
                    <TableCell>{client.planType}</TableCell>
                    <TableCell><StatusBadge status={client.status} /></TableCell>
                    <TableCell className="text-right">₹{client.monthlyCost}/mo</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Recent Activity */}
        <div className="glass-card">
          <div className="p-4 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">Recent Activity</h2>
          </div>
          {recentActivity.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm">
              No activity logs found
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {recentActivity.map(log => (
                <div key={log._id} className="flex items-start gap-3">
                  <div className={`h-2 w-2 rounded-full mt-2 shrink-0 ${
                    log.type === 'success' ? 'bg-success' : log.type === 'warning' ? 'bg-warning' : log.type === 'error' ? 'bg-destructive' : 'bg-primary'
                  }`} />
                  <div className="min-w-0">
                    <p className="text-sm text-foreground">{log.action}</p>
                    <p className="text-xs text-muted-foreground">{log.target} · {new Date(log.timestamp).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
