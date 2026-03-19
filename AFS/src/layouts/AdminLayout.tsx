import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard, Users, Server, Database, Receipt, CreditCard,
  Activity, Settings, LogOut, FolderKanban
} from 'lucide-react';
import { SidebarNavItem } from '@/components/SidebarNavItem';

const adminNav = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/projects', icon: FolderKanban, label: 'Projects' },
  { to: '/admin/clients', icon: Users, label: 'Clients' },
  { to: '/admin/servers', icon: Server, label: 'Server Allocation' },
  { to: '/admin/databases', icon: Database, label: 'Database Allocation' },
  { to: '/admin/billing', icon: Receipt, label: 'Billing' },
  { to: '/admin/payments', icon: CreditCard, label: 'Payment Verification' },
  { to: '/admin/activity', icon: Activity, label: 'Activity Logs' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout() {
  const { user, logout, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user || user.role !== 'super_admin') return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-sidebar flex flex-col shrink-0">
        <div className="p-6 border-b border-border">
          <h1 className="text-lg font-bold text-foreground tracking-tight">AFS</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Infrastructure Manager</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {adminNav.map(item => (
            <SidebarNavItem key={item.to} {...item} />
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold">
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground">Super Admin</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
