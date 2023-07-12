import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header';
import Tabs from './Tabs';

const TalentOnboarding = () => {
  const tabNames = {
    Account: '1',
    Personal: '2',
    Educational: '3',
    Availability: '4',
    Social: '5',
    Payment: '6',
  };

  const [active, setActive] = useState(tabNames.Account);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/talent-onboarding/account-details') setActive(tabNames.Account);
    else if (location.pathname === '/talent-onboarding/personal-details') setActive(tabNames.Personal);
    else if (location.pathname === '/talent-onboarding/educational-details') setActive(tabNames.Educational);
    else if (location.pathname === '/talent-onboarding/availability-details') setActive(tabNames.Availability);
    else if (location.pathname === '/talent-onboarding/social-details') setActive(tabNames.Social);
  }, [location]);

  return (
    <>
      <Header />

      <div className="px-5 py-3">
        <div className="px-2">
          <h2>Onboarding</h2>
          <Tabs tabNames={tabNames} active={active} />
        </div>
      </div>
    </>
  );
};

export default TalentOnboarding;
