import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Login from "./pages/Login";
import AdminLayout from "./layouts/AdminLayout";
import ClientLayout from "./layouts/ClientLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import Projects from "./pages/admin/Projects";
import AdminClients from "./pages/admin/Clients";
import ServerAllocation from "./pages/admin/ServerAllocation";
import DatabaseAllocation from "./pages/admin/DatabaseAllocation";
import AdminBilling from "./pages/admin/Billing";
import PaymentVerification from "./pages/admin/PaymentVerification";
import ActivityLogs from "./pages/admin/ActivityLogs";
import AdminSettings from "./pages/admin/Settings";
import ClientOverview from "./pages/client/Overview";
import MyServer from "./pages/client/MyServer";
import MyDatabase from "./pages/client/MyDatabase";
import ClientBilling from "./pages/client/ClientBilling";
import PaymentHistory from "./pages/client/PaymentHistory";
import Support from "./pages/client/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function RootRedirect() {
  const { user, isAuthenticated, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Navigate to={user?.role === 'super_admin' ? '/admin' : '/client'} replace />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/login" element={<Login />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="projects" element={<Projects />} />
              <Route path="clients" element={<AdminClients />} />
              <Route path="servers" element={<ServerAllocation />} />
              <Route path="databases" element={<DatabaseAllocation />} />
              <Route path="billing" element={<AdminBilling />} />
              <Route path="payments" element={<PaymentVerification />} />
              <Route path="activity" element={<ActivityLogs />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            <Route path="/client" element={<ClientLayout />}>
              <Route index element={<ClientOverview />} />
              <Route path="server" element={<MyServer />} />
              <Route path="database" element={<MyDatabase />} />
              <Route path="billing" element={<ClientBilling />} />
              <Route path="payments" element={<PaymentHistory />} />
              <Route path="support" element={<Support />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
