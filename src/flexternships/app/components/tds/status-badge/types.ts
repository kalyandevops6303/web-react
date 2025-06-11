export interface StatusBadgeProps {
  label: string;
  type: 'active' | 'deactivated' | 'expired' | 'invitation-sent';
  className?: string;
}
