import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard, Server, Database, Receipt, Clock, HelpCircle, LogOut
} from 'lucide-react';
import { SidebarNavItem } from '@/components/SidebarNavItem';

const clientNav = [
  { to: '/client', icon: LayoutDashboard, label: 'Overview' },
  { to: '/client/server', icon: Server, label: 'My Server' },
  { to: '/client/database', icon: Database, label: 'My Database' },
  { to: '/client/billing', icon: Receipt, label: 'Billing' },
  { to: '/client/payments', icon: Clock, label: 'Payment History' },
  { to: '/client/support', icon: HelpCircle, label: 'Support' },
];

export default function ClientLayout() {
  const { user, logout } = useAuth();

  if (!user || user.role !== 'client') return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-screen w-full">
      <aside className="w-64 border-r border-border bg-sidebar flex flex-col shrink-0">
        <div className="p-6 border-b border-border">
          <h1 className="text-lg font-bold text-foreground tracking-tight">RNXA</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Client Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {clientNav.map(item => (
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
              <p className="text-xs text-muted-foreground">Client</p>
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

      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
