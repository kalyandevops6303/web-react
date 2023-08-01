import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header';
import Tabs from './Tabs';
import { userOnboarding } from '../../../utility/constants/Constant';

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
    if (location.pathname === `/${userOnboarding.talent}/account-details`) setActive(tabNames.Account);
    else if (location.pathname === `/${userOnboarding.talent}/personal-details`) setActive(tabNames.Personal);
    else if (location.pathname === `/${userOnboarding.talent}/educational-details`) setActive(tabNames.Educational);
    else if (location.pathname === `/${userOnboarding.talent}/availability-details`) setActive(tabNames.Availability);
    else if (location.pathname === `/${userOnboarding.talent}/social-details`) setActive(tabNames.Social);
  }, [location]);

  return (
    <>
      <Header />

      <div className="px-5 py-3">
        <div className="px-2">
          <h2>{location?.state?.isEditing ? 'Edit Profile' : 'Onboarding'}</h2>
          <Tabs tabNames={tabNames} active={active} />
        </div>
      </div>
    </>
  );
};

export default TalentOnboarding;
