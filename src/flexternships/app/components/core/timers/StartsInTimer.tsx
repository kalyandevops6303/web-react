import { getTimeLeftIfWithin24Hours } from '@/flexternships/utils/date-utils';
import { useState, useEffect } from 'react';

/**
 * Component that displays a countdown timer showing hours/minutes/seconds until a future timestamp
 * Only shows if the timestamp is within the next 24 hours
 */
export default function StartsInTimer(props: Props) {
  const { epoch, hideMinutes = false, hideSeconds = false } = props;
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | undefined>(undefined);

  useEffect(() => {
    // Initialize time left immediately
    setTimeLeft(getTimeLeftIfWithin24Hours(epoch));

    // Update every second
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeftIfWithin24Hours(epoch));
    }, 1000);

    return () => clearInterval(interval);
  }, [epoch]);

  if (!timeLeft) return null;

  // Format time parts based on hide flags
  const timeParts = [
    `${timeLeft.hours}`.padStart(2, '0'),
    !hideMinutes && `${timeLeft.minutes}`.padStart(2, '0'),
    !hideSeconds && !hideMinutes && `${timeLeft.seconds}`.padStart(2, '0'),
  ].filter(Boolean);

  return (
    <span className="text-error text-xs not-italic font-semibold leading-4.5">Starts in {timeParts.join(':')} Hr</span>
  );
}

type Props = {
  epoch: number; // Future timestamp in milliseconds
  hideMinutes?: boolean; // If true, only shows hours
  hideSeconds?: boolean; // If true, hides seconds display
};
