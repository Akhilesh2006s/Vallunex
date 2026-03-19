import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusStyles: Record<string, string> = {
  Active: 'bg-success/10 text-success',
  Paid: 'bg-success/10 text-success',
  Approved: 'bg-success/10 text-success',
  Pending: 'bg-warning/10 text-warning',
  Provisioning: 'bg-primary/10 text-primary',
  Suspended: 'bg-destructive/10 text-destructive',
  Stopped: 'bg-destructive/10 text-destructive',
  Overdue: 'bg-destructive/10 text-destructive',
  Rejected: 'bg-destructive/10 text-destructive',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      statusStyles[status] || 'bg-muted text-muted-foreground',
      className
    )}>
      {status}
    </span>
  );
}
