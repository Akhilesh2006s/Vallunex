import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CheckCircle, XCircle, Eye, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Payment {
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
}

export default function PaymentVerification() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Payment | null>(null);
  const [remarks, setRemarks] = useState('');
  const [verifying, setVerifying] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      setLoading(true);
      const data = await api.getPayments();
      setPayments(data);
    } catch (error) {
      console.error('Failed to load payments:', error);
      toast({
        title: 'Error',
        description: 'Failed to load payments',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getClientName = (clientId: string | { _id: string; companyName: string }) => {
    if (typeof clientId === 'object') {
      return clientId.companyName;
    }
    return 'Unknown';
  };

  const getInvoiceId = (invoiceId: string | { _id: string; invoiceId: string; total: number }) => {
    if (typeof invoiceId === 'object') {
      return invoiceId.invoiceId;
    }
    return invoiceId;
  };

  const getVerifiedByName = (verifiedBy?: string | { _id: string; name: string }) => {
    if (!verifiedBy) return '—';
    if (typeof verifiedBy === 'object') {
      return verifiedBy.name;
    }
    return verifiedBy;
  };

  const handleAction = async (paymentId: string, action: 'Approved' | 'Rejected') => {
    try {
      setVerifying(true);
      await api.verifyPayment(paymentId, { status: action, remarks });
      toast({
        title: 'Success',
        description: `Payment ${action.toLowerCase()} successfully`,
      });
      setSelected(null);
      setRemarks('');
      loadPayments();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to verify payment',
        variant: 'destructive',
      });
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-header">Payment Verification</h1>
        <p className="page-subtitle">Review and verify client payment submissions</p>
      </div>

      <div className="glass-card">
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center p-8 text-muted-foreground">
            No payments found
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>UTR</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Verified By</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map(p => (
                <TableRow key={p._id}>
                  <TableCell className="font-mono text-sm">{getInvoiceId(p.invoiceId)}</TableCell>
                  <TableCell className="font-medium">{getClientName(p.clientId)}</TableCell>
                  <TableCell className="text-muted-foreground">{p.transactionId || '—'}</TableCell>
                  <TableCell className="text-muted-foreground">{p.utrNumber || '—'}</TableCell>
                  <TableCell className="text-muted-foreground">{new Date(p.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell><StatusBadge status={p.status} /></TableCell>
                  <TableCell className="text-muted-foreground">{getVerifiedByName(p.verifiedBy)}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => { setSelected(p); setRemarks(''); }}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        )}
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Invoice</p>
                  <p className="font-medium">{getInvoiceId(selected.invoiceId)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Client</p>
                  <p className="font-medium">{getClientName(selected.clientId)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Transaction ID</p>
                  <p className="font-medium">{selected.transactionId || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">UTR Number</p>
                  <p className="font-medium">{selected.utrNumber || 'N/A'}</p>
                </div>
              </div>

              {selected.status === 'Pending' && (
                <>
                  <div className="space-y-2">
                    <Label>Remarks</Label>
                    <Input value={remarks} onChange={e => setRemarks(e.target.value)} placeholder="Optional remarks..." />
                  </div>
                  <div className="flex gap-3">
                    <Button className="flex-1" onClick={() => handleAction(selected._id, 'Approved')} disabled={verifying}>
                      {verifying ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <CheckCircle className="h-4 w-4 mr-2" />
                      )}
                      Approve
                    </Button>
                    <Button variant="outline" className="flex-1 text-destructive" onClick={() => handleAction(selected._id, 'Rejected')} disabled={verifying}>
                      {verifying ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <XCircle className="h-4 w-4 mr-2" />
                      )}
                      Reject
                    </Button>
                  </div>
                </>
              )}

              {selected.status !== 'Pending' && (
                <div className="text-sm space-y-2 border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <StatusBadge status={selected.status} />
                  </div>
                  {selected.verifiedBy && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Verified By</span>
                      <span>{getVerifiedByName(selected.verifiedBy)}</span>
                    </div>
                  )}
                  {selected.receiptId && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Receipt ID</span>
                      <span className="font-mono">{selected.receiptId}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
