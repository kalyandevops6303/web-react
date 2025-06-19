type LegacyStatus = 'active' | 'deactivated' | 'expired' | 'invitation-sent';
type NewStatus =
  | 'ACTIVE'
  | 'DEACTIVATED'
  | 'EXPIRED'
  | 'INVITATION_SENT'
  | 'INVITED'
  | 'INVITE_EXPIRED'
  | 'PROJECT_ONGOING'
  | 'REMOVED'
  | 'ASSIGNED_TO_COHORT'
  | 'ASSIGNED_TO_DEPARTMENT'
  | 'ASSIGNED_TO_PROJECT'
  | 'PROJECT_COMPLETED';

export interface StatusBadgeProps {
  label: string | React.ReactNode;
  type: LegacyStatus | NewStatus;
  className?: string;
}
