import { Client, Invoice, Payment, ActivityLog, User } from '@/types';

export const mockUsers: User[] = [
  { id: 'u1', name: 'Admin User', email: 'admin@rnxa.com', role: 'super_admin' },
  { id: 'u2', name: 'John Carter', email: 'john@acmecorp.com', role: 'client' },
  { id: 'u3', name: 'Sarah Chen', email: 'sarah@techflow.io', role: 'client' },
];

export const mockClients: Client[] = [
  {
    id: 'c1', companyName: 'Acme Corp', contactEmail: 'john@acmecorp.com',
    planType: 'Enterprise', status: 'Active', monthlyCost: 1250,
    createdAt: '2025-01-15',
    serverConfig: { cpu: '8 vCPU', ram: '32GB', storage: '500GB SSD', hostingProvider: 'AWS', estimatedCost: 480, deploymentDate: '2025-01-20', status: 'Active' },
    databaseConfig: { type: 'PostgreSQL', storageSize: '100GB', region: 'us-east-1', monthlyCost: 120, backupEnabled: true },
  },
  {
    id: 'c2', companyName: 'TechFlow Inc', contactEmail: 'sarah@techflow.io',
    planType: 'Professional', status: 'Active', monthlyCost: 780,
    createdAt: '2025-03-10',
    serverConfig: { cpu: '4 vCPU', ram: '16GB', storage: '250GB SSD', hostingProvider: 'DigitalOcean', estimatedCost: 280, deploymentDate: '2025-03-15', status: 'Active' },
    databaseConfig: { type: 'MongoDB Atlas', storageSize: '50GB', region: 'eu-west-1', monthlyCost: 80, backupEnabled: true },
  },
  {
    id: 'c3', companyName: 'NovaTech Solutions', contactEmail: 'info@novatech.dev',
    planType: 'Starter', status: 'Active', monthlyCost: 320,
    createdAt: '2025-06-01',
    serverConfig: { cpu: '2 vCPU', ram: '4GB', storage: '80GB SSD', hostingProvider: 'GCP', estimatedCost: 120, deploymentDate: '2025-06-05', status: 'Active' },
    databaseConfig: { type: 'MySQL', storageSize: '20GB', region: 'asia-south-1', monthlyCost: 40, backupEnabled: false },
  },
  {
    id: 'c4', companyName: 'CloudBridge Ltd', contactEmail: 'ops@cloudbridge.co',
    planType: 'Enterprise', status: 'Suspended', monthlyCost: 2100,
    createdAt: '2024-11-20',
    serverConfig: { cpu: '16 vCPU', ram: '64GB', storage: '1TB SSD', hostingProvider: 'AWS', estimatedCost: 960, deploymentDate: '2024-12-01', status: 'Stopped' },
    databaseConfig: { type: 'PostgreSQL', storageSize: '500GB', region: 'us-west-2', monthlyCost: 250, backupEnabled: true },
  },
];

export const mockInvoices: Invoice[] = [
  { id: 'inv1', invoiceId: 'INV-2026-001', clientId: 'c1', breakdown: { baseInfrastructure: 600, maintenance: 200, aiUsage: 450 }, total: 1250, status: 'Paid', dueDate: '2026-02-28', createdAt: '2026-02-01' },
  { id: 'inv2', invoiceId: 'INV-2026-002', clientId: 'c2', breakdown: { baseInfrastructure: 360, maintenance: 150, aiUsage: 270 }, total: 780, status: 'Pending', dueDate: '2026-03-05', createdAt: '2026-02-01' },
  { id: 'inv3', invoiceId: 'INV-2026-003', clientId: 'c3', breakdown: { baseInfrastructure: 160, maintenance: 80, aiUsage: 80 }, total: 320, status: 'Overdue', dueDate: '2026-02-15', createdAt: '2026-02-01' },
  { id: 'inv4', invoiceId: 'INV-2026-004', clientId: 'c4', breakdown: { baseInfrastructure: 1210, maintenance: 400, aiUsage: 490 }, total: 2100, status: 'Pending', dueDate: '2026-03-01', createdAt: '2026-02-01' },
  { id: 'inv5', invoiceId: 'INV-2026-005', clientId: 'c1', breakdown: { baseInfrastructure: 600, maintenance: 200, aiUsage: 450 }, total: 1250, status: 'Paid', dueDate: '2026-01-28', createdAt: '2026-01-01' },
];

export const mockPayments: Payment[] = [
  { id: 'p1', invoiceId: 'INV-2026-001', clientId: 'c1', transactionId: 'TXN-89201', status: 'Approved', verifiedBy: 'Admin User', verifiedAt: '2026-02-20T10:30:00Z', receiptId: 'RCP-2026-001', createdAt: '2026-02-19T08:00:00Z' },
  { id: 'p2', invoiceId: 'INV-2026-002', clientId: 'c2', utrNumber: 'UTR123456789', status: 'Pending', createdAt: '2026-02-25T14:00:00Z' },
  { id: 'p3', invoiceId: 'INV-2026-005', clientId: 'c1', transactionId: 'TXN-78102', status: 'Approved', verifiedBy: 'Admin User', verifiedAt: '2026-01-25T09:00:00Z', receiptId: 'RCP-2026-002', createdAt: '2026-01-24T11:00:00Z' },
];

export const mockActivityLogs: ActivityLog[] = [
  { id: 'a1', action: 'Payment verified', user: 'Admin User', target: 'Acme Corp - INV-2026-001', timestamp: '2026-02-20T10:30:00Z', type: 'success' },
  { id: 'a2', action: 'Client created', user: 'Admin User', target: 'NovaTech Solutions', timestamp: '2026-02-18T09:15:00Z', type: 'info' },
  { id: 'a3', action: 'Server allocated', user: 'Admin User', target: 'TechFlow Inc - 4 vCPU', timestamp: '2026-02-15T14:20:00Z', type: 'info' },
  { id: 'a4', action: 'Invoice generated', user: 'System', target: 'INV-2026-003', timestamp: '2026-02-01T00:00:00Z', type: 'info' },
  { id: 'a5', action: 'Client suspended', user: 'Admin User', target: 'CloudBridge Ltd', timestamp: '2026-01-28T16:45:00Z', type: 'warning' },
  { id: 'a6', action: 'Payment submitted', user: 'Sarah Chen', target: 'INV-2026-002', timestamp: '2026-02-25T14:00:00Z', type: 'info' },
  { id: 'a7', action: 'Database backup failed', user: 'System', target: 'NovaTech Solutions', timestamp: '2026-02-22T03:00:00Z', type: 'error' },
];
