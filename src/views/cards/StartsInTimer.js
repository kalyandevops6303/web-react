import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getTimeLeftIfWithin24Hours, getDaysLeft } from '@/flexternships/utils/date-utils';
/**
 * Component that displays a countdown timer for a future timestamp
 * - If the event is within 24 hours, it shows "Starts in HH:MM:SS Hr"
 * - If the event is more than 24 hours away, it shows "Starts in X days"
 */
export default function StartsInTimer(props) {
  const { epoch, hideMinutes = false, hideSeconds = false } = props;
  const [timeLeft, setTimeLeft] = useState(null);
  const [daysLeft, setDaysLeft] = useState(null);

  const updateTimeLeft = () => {
    const timeData = getTimeLeftIfWithin24Hours(epoch);
    if (timeData) {
      setTimeLeft(timeData);
      setDaysLeft(null); // Reset days left when within 24 hours
    } else {
      setDaysLeft(getDaysLeft(epoch));
      setTimeLeft(null); // Reset hours/minutes when more than 24 hours left
    }
  };
  useEffect(() => {
    // Initial calculation
    updateTimeLeft();

    // Update every second
    const interval = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [epoch]);

  if (daysLeft !== null) {
    return <span className="text-error text-xs font-semibold">Starts in {daysLeft} days</span>;
  }

  if (!timeLeft) return null;

  const { hours, minutes, seconds } = timeLeft;
  const timeParts = [
    `${hours}`.padStart(2, '0'),
    !hideMinutes && `${minutes}`.padStart(2, '0'),
    !hideSeconds && !hideMinutes && `${seconds}`.padStart(2, '0'),
  ].filter(Boolean);

  return <span className="text-error text-xs font-semibold">Starts in {timeParts.join(':')} Hr</span>;
}

StartsInTimer.defaultProps = {
  hideMinutes: false,
  hideSeconds: false,
};

StartsInTimer.propTypes = {
  epoch: PropTypes.number.isRequired,
  hideMinutes: PropTypes.bool,
  hideSeconds: PropTypes.bool,
};
