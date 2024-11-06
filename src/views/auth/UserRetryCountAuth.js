import { userAttemptNo } from '@/redux/selectors/authSelectors';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const UserRetryCountAuth = () => {
  const userLoginAttemptNo = useSelector(userAttemptNo);
  const [timeLeft, setTimeLeft] = useState(0);

  const maxCount = 5;

  useEffect(() => {
    if (userLoginAttemptNo > maxCount) {
      const interval = setInterval(() => {
        const now = Date.now();
        const diff = userLoginAttemptNo - now;
        if (diff > 0) {
          setTimeLeft(diff);
        } else {
          setTimeLeft(0);
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [userLoginAttemptNo]);

  if (!userLoginAttemptNo) {
    return <></>;
  }

  if (userLoginAttemptNo > maxCount) {
    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);

    return (
      <div className="text-error text-xs flex  relative mb-4" role="alert">
        <p>Your account is disabled.</p>
        <p>
          Please try again in{' '}
          <span className="font-semibold">
            {minutes}:{seconds.toString().padStart(2, '0')}
          </span>{' '}
          {''}
          mins.
        </p>
      </div>
    );
  }

  if (maxCount - userLoginAttemptNo === 1) {
    return (
      <div className="mb-1">
        <p className="text-error text-xs">
          This is your last attempt. If incorrect, your account will be disabled for 30 mins.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-content-between items-center mb-1 text-xs">
      <p className="text-error">Invalid entry</p>
      <p>{maxCount - userLoginAttemptNo} attempts left</p>
    </div>
  );
};

export default UserRetryCountAuth;
