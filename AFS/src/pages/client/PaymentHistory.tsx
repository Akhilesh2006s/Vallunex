import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { StatusBadge } from '@/components/StatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2 } from 'lucide-react';

interface Payment {
  _id: string;
  invoiceId: string | { _id: string; invoiceId: string; total: number };
  clientId: string;
  transactionId?: string;
  utrNumber?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  receiptId?: string;
  createdAt: string;
}

export default function PaymentHistory() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      setLoading(true);
      const data = await api.getMyPayments();
      setPayments(data);
    } catch (error) {
      console.error('Failed to load payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInvoiceId = (invoiceId: string | { _id: string; invoiceId: string; total: number }) => {
    if (typeof invoiceId === 'object') {
      return invoiceId.invoiceId;
    }
    return invoiceId;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-header">Payment History</h1>
        <p className="page-subtitle">View your past payment submissions and statuses</p>
      </div>

      <div className="glass-card">
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Receipt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">No payments found</TableCell>
                </TableRow>
              ) : (
                payments.map(p => (
                  <TableRow key={p._id}>
                    <TableCell className="font-mono text-sm">{getInvoiceId(p.invoiceId)}</TableCell>
                    <TableCell className="text-muted-foreground">{p.transactionId || p.utrNumber || '—'}</TableCell>
                    <TableCell className="text-muted-foreground">{new Date(p.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell><StatusBadge status={p.status} /></TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">{p.receiptId || '—'}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
