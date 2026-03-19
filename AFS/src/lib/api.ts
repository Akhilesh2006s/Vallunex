const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface Client {
  _id: string;
  companyName: string;
  contactEmail: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  projectIds?: Array<string | { _id: string; name: string }>;
  projectId?: string | { _id: string; name: string }; // Legacy support
  planType: 'Starter' | 'Professional' | 'Enterprise';
  status: 'Active' | 'Suspended';
  serverConfig?: {
    cpu: string;
    ram: string;
    storage: string;
    hostingProvider: 'AmenityForge' | 'AWS' | 'DigitalOcean' | 'GCP' | 'Custom';
    estimatedCost: number;
    deploymentDate: string;
    status: 'Active' | 'Provisioning' | 'Stopped';
  };
  databaseConfig?: {
    type: 'MongoDB Atlas' | 'MySQL' | 'PostgreSQL';
    storageSize: string;
    region: string;
    monthlyCost: number;
    backupEnabled: boolean;
    connectionString?: string;
  };
  monthlyCost: number;
  createdAt: string;
  updatedAt: string;
}

class ApiService {
  private getToken(): string | null {
    return sessionStorage.getItem('afs_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || 'Request failed');
    }

    return response.json();
  }

  // Auth
  async login(email: string, password: string): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>('/auth/me');
  }

  // Clients
  async getClients(): Promise<Client[]> {
    return this.request<Client[]>('/clients');
  }

  async getClient(id: string): Promise<Client> {
    return this.request<Client>(`/clients/${id}`);
  }

  async createClient(data: {
    companyName: string;
    contactEmail: string;
    planType?: 'Starter' | 'Professional' | 'Enterprise';
    monthlyCost?: number;
    projectIds?: string[];
  }): Promise<Client> {
    return this.request<Client>('/clients', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateClient(
    id: string,
    data: Partial<{
      companyName: string;
      contactEmail: string;
      planType: 'Starter' | 'Professional' | 'Enterprise';
      status: 'Active' | 'Suspended';
      monthlyCost: number;
      projectIds: string[];
    }>
  ): Promise<Client> {
    return this.request<Client>(`/clients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteClient(id: string): Promise<void> {
    return this.request<void>(`/clients/${id}`, {
      method: 'DELETE',
    });
  }

  async assignDatabase(
    id: string,
    databaseConfig: Partial<Client['databaseConfig']>
  ): Promise<Client> {
    return this.request<Client>(`/clients/${id}/assign-database`, {
      method: 'POST',
      body: JSON.stringify({ databaseConfig }),
    });
  }

  // Dashboard
  async getDashboardStats(): Promise<{
    totalClients: number;
    clientsThisMonth: number;
    activeServers: number;
    activeClients: number;
    monthlyRevenue: number;
    revenueChange: string | null;
    pendingPayments: number;
    verifiedPayments: number;
  }> {
    return this.request('/dashboard/stats');
  }

  async getRecentClients(): Promise<Client[]> {
    return this.request<Client[]>('/dashboard/recent-clients');
  }

  async getRecentActivity(): Promise<Array<{
    _id: string;
    action: string;
    user: string;
    target: string;
    timestamp: string;
    type: 'info' | 'warning' | 'success' | 'error';
  }>> {
    return this.request('/dashboard/recent-activity');
  }

  // Invoices
  async getInvoices(): Promise<Array<{
    _id: string;
    invoiceId: string;
    clientId: string | { _id: string; companyName: string; contactEmail: string };
    items?: Array<{
      description: string;
      quantity: number;
      rate: number;
      amount: number;
    }>;
    breakdown: {
      baseInfrastructure: number;
      maintenance: number;
      aiUsage: number;
    };
    total: number;
    status: 'Pending' | 'Paid' | 'Overdue';
    dueDate: string;
    createdAt: string;
  }>> {
    return this.request('/invoices');
  }

  async getMyInvoices(): Promise<Array<{
    _id: string;
    invoiceId: string;
    clientId: string;
    items?: Array<{
      description: string;
      quantity: number;
      rate: number;
      amount: number;
    }>;
    breakdown: {
      baseInfrastructure: number;
      maintenance: number;
      aiUsage: number;
    };
    total: number;
    status: 'Pending' | 'Paid' | 'Overdue';
    dueDate: string;
    createdAt: string;
  }>> {
    return this.request('/invoices/my-invoices');
  }

  async createInvoice(data: {
    invoiceId: string;
    clientId: string;
    projectId?: string;
    items?: Array<{
      description: string;
      quantity: number;
      rate: number;
      amount: number;
    }>;
    breakdown?: {
      baseInfrastructure: number;
      maintenance: number;
      aiUsage: number;
    };
    billingType?: 'single' | 'recurring';
    extraCost?: number;
    total: number;
    dueDate: string;
  }): Promise<any> {
    return this.request('/invoices', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Payments
  async getPayments(): Promise<Array<{
    _id: string;
    invoiceId: string | { _id: string; invoiceId: string; total: number };
    clientId: string | { _id: string; companyName: string };
    transactionId?: string;
    utrNumber?: string;
    screenshotUrl?: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    remarks?: string;
    verifiedBy?: string | { _id: string; name: string };
    verifiedAt?: string;
    receiptId?: string;
    createdAt: string;
  }>> {
    return this.request('/payments');
  }

  async getMyPayments(): Promise<Array<{
    _id: string;
    invoiceId: string | { _id: string; invoiceId: string; total: number };
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
  }>> {
    return this.request('/payments/my-payments');
  }

  async submitPayment(data: {
    invoiceId: string;
    transactionId?: string;
    utrNumber?: string;
    screenshotUrl?: string;
  }): Promise<any> {
    return this.request('/payments/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async verifyPayment(
    id: string,
    data: { status: 'Approved' | 'Rejected'; remarks?: string }
  ): Promise<any> {
    return this.request(`/payments/${id}/verify`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Activity Logs
  async getActivityLogs(): Promise<Array<{
    _id: string;
    action: string;
    user: string;
    target: string;
    timestamp: string;
    type: 'info' | 'warning' | 'success' | 'error';
  }>> {
    return this.request('/activity');
  }

  // Client Data (for logged-in client)
  async getMyClientData(): Promise<Client> {
    return this.request('/client/me');
  }

  async getMyLatestInvoice(): Promise<{
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
  } | null> {
    return this.request('/client/latest-invoice');
  }

  // Projects
  async getProjects(): Promise<Array<{
    _id: string;
    name: string;
    description: string;
    clients: Array<{ _id: string; companyName: string; contactEmail: string; status: string }>;
    serverConfig: {
      cpu: string;
      ram: string;
      storage: string;
      hostingProvider: 'AmenityForge' | 'AWS' | 'DigitalOcean' | 'GCP' | 'Custom';
      estimatedCost: number;
      deploymentDate: string;
      status: 'Active' | 'Provisioning' | 'Stopped';
    };
    databaseConfig: {
      type: 'MongoDB Atlas' | 'MySQL' | 'PostgreSQL';
      storageSize: string;
      region: string;
      monthlyCost: number;
      backupEnabled: boolean;
      connectionString?: string;
    };
    status: 'Active' | 'Inactive';
    createdAt: string;
    updatedAt: string;
  }>> {
    return this.request('/projects');
  }

  async getProject(id: string): Promise<{
    _id: string;
    name: string;
    description: string;
    clients: Array<{ _id: string; companyName: string; contactEmail: string; status: string; monthlyCost: number }>;
    serverConfig: {
      cpu: string;
      ram: string;
      storage: string;
      hostingProvider: 'AmenityForge' | 'AWS' | 'DigitalOcean' | 'GCP' | 'Custom';
      estimatedCost: number;
      deploymentDate: string;
      status: 'Active' | 'Provisioning' | 'Stopped';
    };
    databaseConfig: {
      type: 'MongoDB Atlas' | 'MySQL' | 'PostgreSQL';
      storageSize: string;
      region: string;
      monthlyCost: number;
      backupEnabled: boolean;
      connectionString?: string;
    };
    status: 'Active' | 'Inactive';
    createdAt: string;
    updatedAt: string;
  }> {
    return this.request(`/projects/${id}`);
  }

  async createProject(data: {
    name: string;
    description?: string;
    serverConfig?: Partial<Client['serverConfig']>;
    databaseConfig?: Partial<Client['databaseConfig']>;
    clientIds?: string[];
  }): Promise<any> {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProject(
    id: string,
    data: Partial<{
      name: string;
      description: string;
      status: 'Active' | 'Inactive';
      serverConfig: Partial<Client['serverConfig']>;
      databaseConfig: Partial<Client['databaseConfig']>;
      clientIds: string[];
    }>
  ): Promise<any> {
    return this.request(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProject(id: string): Promise<void> {
    return this.request(`/projects/${id}`, {
      method: 'DELETE',
    });
  }

  async assignClientsToProject(id: string, clientIds: string[]): Promise<any> {
    return this.request(`/projects/${id}/assign-clients`, {
      method: 'POST',
      body: JSON.stringify({ clientIds }),
    });
  }
}

export const api = new ApiService();
