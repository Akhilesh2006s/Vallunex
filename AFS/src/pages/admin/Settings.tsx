import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminSettings() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-header">Settings</h1>
        <p className="page-subtitle">Manage system configuration</p>
      </div>

      <div className="glass-card p-6 max-w-xl space-y-6">
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-foreground">General</h2>
          <div className="space-y-2">
            <Label>Company Name</Label>
            <Input defaultValue="RNXA Technologies" />
          </div>
          <div className="space-y-2">
            <Label>Admin Email</Label>
            <Input defaultValue="admin@rnxa.com" />
          </div>
        </div>

        <div className="border-t border-border pt-6 space-y-4">
          <h2 className="text-sm font-semibold text-foreground">Billing</h2>
          <div className="space-y-2">
            <Label>Default Currency</Label>
            <Input defaultValue="INR" />
          </div>
          <div className="space-y-2">
            <Label>Invoice Prefix</Label>
            <Input defaultValue="INV" />
          </div>
        </div>

        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
