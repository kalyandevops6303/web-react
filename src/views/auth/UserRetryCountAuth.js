import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userAttemptNo } from '@/redux/selectors/authSelectors';

const UserRetryCountAuth = () => {
  const userLoginAttemptNo = useSelector(userAttemptNo);
  const [timeLeft, setTimeLeft] = useState(0);
  const [blockedUntil, setBlockedUntil] = useState(null);

  const maxCount = 5;
  useEffect(() => {
    let interval;

    if (userLoginAttemptNo > maxCount) {
      if (!blockedUntil) {
        const thirtyMinutesFromNow = Date.now() + 30 * 60 * 1000;
        setBlockedUntil(thirtyMinutesFromNow);
        setTimeLeft(30 * 60 * 1000);
        return; // Exit early, the interval will start on the next run
      }

      interval = setInterval(() => {
        const now = Date.now();
        const diff = blockedUntil - now;

        if (diff > 0) {
          setTimeLeft(diff);
        } else {
          setTimeLeft(0);
          setBlockedUntil(null);
          clearInterval(interval);
        }
      }, 1000);
    } else {
      // User is no longer blocked
      setBlockedUntil(null);
      setTimeLeft(0);
    }
  }, [userLoginAttemptNo, blockedUntil]);

  if (!userLoginAttemptNo) {
    return null;
  }

  if (userLoginAttemptNo > maxCount) {
    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);

    return (
      <div className="text-error text-xs flex  relative mt-2" role="alert">
        <p>
          Your account is disabled. Please try again in{' '}
          <span className="font-semibold">
            {' '}
            {minutes}:{seconds.toString().padStart(2, '0')}{' '}
          </span>
          mins.
        </p>
      </div>
    );
  }

  if (maxCount - userLoginAttemptNo === 1) {
    return (
      <div className="mt-2">
        <p className="text-error text-xs">
          This is your last attempt. If incorrect, your account will be disabled for 30 mins.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-content-between items-center text-xs mt-2">
      <p className="text-error">Invalid Password</p>
      <p>{maxCount - userLoginAttemptNo} attempts left</p>
    </div>
  );
};

export default UserRetryCountAuth;
