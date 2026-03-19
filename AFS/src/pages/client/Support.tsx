import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { MessageCircle } from 'lucide-react';

export default function Support() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-header">Support</h1>
        <p className="page-subtitle">Get help from the RNXA team</p>
      </div>

      <div className="glass-card p-6 max-w-lg">
        {submitted ? (
          <div className="text-center py-8">
            <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="h-5 w-5 text-success" />
            </div>
            <p className="text-sm font-medium text-foreground">Ticket submitted</p>
            <p className="text-xs text-muted-foreground mt-1">We'll get back to you within 24 hours</p>
            <Button variant="outline" className="mt-4" onClick={() => setSubmitted(false)}>Submit another</Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input placeholder="Brief description of your issue" />
            </div>
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea placeholder="Describe your issue in detail..." rows={5} />
            </div>
            <Button className="w-full" onClick={() => setSubmitted(true)}>Submit Ticket</Button>
          </div>
        )}
      </div>
    </div>
  );
}
