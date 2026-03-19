export type UserRole = 'super_admin' | 'client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface ServerConfig {
  cpu: string;
  ram: string;
  storage: string;
  hostingProvider: 'AmenityForge' | 'AWS' | 'DigitalOcean' | 'GCP' | 'Custom';
  estimatedCost: number;
  deploymentDate: string;
  status: 'Active' | 'Provisioning' | 'Stopped';
}

export interface DatabaseConfig {
  type: 'MongoDB Atlas' | 'MySQL' | 'PostgreSQL';
  storageSize: string;
  region: string;
  monthlyCost: number;
  backupEnabled: boolean;
}

export interface Client {
  id: string;
  companyName: string;
  contactEmail: string;
  planType: 'Starter' | 'Professional' | 'Enterprise';
  status: 'Active' | 'Suspended';
  serverConfig: ServerConfig;
  databaseConfig: DatabaseConfig;
  monthlyCost: number;
  createdAt: string;
}

export interface InvoiceBreakdown {
  baseInfrastructure: number;
  maintenance: number;
  aiUsage: number;
}

export interface Invoice {
  id: string;
  invoiceId: string;
  clientId: string;
  breakdown: InvoiceBreakdown;
  total: number;
  status: 'Pending' | 'Paid' | 'Overdue';
  dueDate: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  clientId: string;
  transactionId?: string;
  utrNumber?: string;
  screenshotUrl?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  remarks?: string;
  verifiedBy?: string;
  verifiedAt?: string;
  receiptId?: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  user: string;
  target: string;
  timestamp: string;
  type: 'info' | 'warning' | 'success' | 'error';
}
