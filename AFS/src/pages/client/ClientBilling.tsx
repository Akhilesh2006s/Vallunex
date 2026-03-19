import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Upload, Loader2, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Invoice {
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
  extraCost?: number;
}

export default function ClientBilling() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [utr, setUtr] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      setLoading(true);
      const data = await api.getMyInvoices();
      setInvoices(data);
    } catch (error) {
      console.error('Failed to load invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentInvoice = invoices.find(i => i.status !== 'Paid') || invoices[0];

  const handleSubmitPayment = async () => {
    if (!currentInvoice || !utr.trim()) return;

    try {
      setSubmitting(true);
      await api.submitPayment({
        invoiceId: currentInvoice._id,
        utrNumber: utr,
      });
      setSubmitted(true);
      toast({
        title: 'Success',
        description: 'Payment submitted successfully',
      });
      loadInvoices();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit payment',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-header">Billing</h1>
        <p className="page-subtitle">View invoices and submit payments</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : invoices.length === 0 ? (
        <div className="glass-card p-6 text-center text-muted-foreground">
          No invoices found
        </div>
      ) : (
        <>
          {/* All Invoices Table */}
          <div className="glass-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map(inv => (
                  <TableRow key={inv._id}>
                    <TableCell className="font-mono text-sm">{inv.invoiceId}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {inv.items && inv.items.length > 0 ? (
                        <span>{inv.items.length} item(s)</span>
                      ) : (
                        <span>3 items</span>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">₹{inv.total.toLocaleString('en-IN')}</TableCell>
                    <TableCell className="text-muted-foreground">{new Date(inv.dueDate).toLocaleDateString()}</TableCell>
                    <TableCell><StatusBadge status={inv.status} /></TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setSelectedInvoice(inv)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Invoice {inv.invoiceId}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            {inv.items && inv.items.length > 0 ? (
                              <div className="border-t border-border pt-4 space-y-2">
                                {inv.items.map((item, idx) => (
                                  <div key={idx} className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">{item.description}</span>
                                    <span>₹{item.amount.toLocaleString('en-IN')} ({item.quantity} × ₹{item.rate.toLocaleString('en-IN')})</span>
                                  </div>
                                ))}
                                {inv.extraCost && inv.extraCost > 0 && (
                                  <div className="flex justify-between text-sm pt-2 border-t">
                                    <span className="text-muted-foreground">Extra Cost</span>
                                    <span>₹{inv.extraCost.toLocaleString('en-IN')}</span>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="border-t border-border pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">Base Infrastructure</span>
                                  <span>₹{inv.breakdown.baseInfrastructure}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">Maintenance</span>
                                  <span>₹{inv.breakdown.maintenance}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">AI Usage</span>
                                  <span>₹{inv.breakdown.aiUsage}</span>
                                </div>
                              </div>
                            )}
                            <div className="border-t border-border pt-4 flex justify-between font-semibold">
                              <span>Total</span>
                              <span>₹{inv.total.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Status</span>
                              <StatusBadge status={inv.status} />
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Payment Submission for Current Invoice */}
          {currentInvoice && currentInvoice.status !== 'Paid' && (
            <div className="glass-card p-6 max-w-lg">
              <h2 className="text-sm font-semibold text-foreground mb-4">Submit Payment for {currentInvoice.invoiceId}</h2>
              {submitted ? (
                <div className="text-center py-6">
                  <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-3">
                    <Upload className="h-5 w-5 text-success" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Payment submitted</p>
                  <p className="text-xs text-muted-foreground mt-1">Awaiting admin verification</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>UTR / Transaction ID</Label>
                    <Input value={utr} onChange={e => setUtr(e.target.value)} placeholder="Enter UTR or Transaction ID" />
                  </div>
                  <div className="space-y-2">
                    <Label>Payment Screenshot (optional)</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                      <Upload className="h-5 w-5 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Click to upload</p>
                    </div>
                  </div>
                  <Button className="w-full" onClick={handleSubmitPayment} disabled={!utr.trim() || submitting}>
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Payment'
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
