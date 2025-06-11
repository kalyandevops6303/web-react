import { StatusBadgeProps } from './types';

export const StatusBadge: React.FC<StatusBadgeProps> = ({ label, type, className }) => {
  let badgeClass = '';

  switch (type) {
    case 'active':
      badgeClass = 'bg-green-100 text-green-strength';
      break;
    case 'deactivated':
      badgeClass = 'bg-gray-100 text-gray-500';
      break;
    case 'expired':
      badgeClass = 'bg-error-100 text-error ';
      break;
    case 'invitation-sent':
      badgeClass = 'bg-blue-accent-100 text-blue-700';
      break;
    default:
      badgeClass = 'bg-gray-100 text-gray-600';
      break;
  }

  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full inline-block ${badgeClass} ${className}`}>
      {label}
    </span>
  );
};
