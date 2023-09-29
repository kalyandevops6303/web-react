import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header';
import Tabs from './Tabs';
import { userOnboarding } from '../../../utility/constants/Constant';

const ClientOnboarding = () => {
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
    if (location.pathname === `/${userOnboarding.client}/account-details`) setActive(tabNames.Account);
    else if (location.pathname === `/${userOnboarding.client}/personal-details`) setActive(tabNames.Personal);
    else if (location.pathname === `/${userOnboarding.client}/educational-details`) setActive(tabNames.Educational);
    else if (location.pathname === `/${userOnboarding.client}/availability-details`) setActive(tabNames.Availability);
    else if (location.pathname === `/${userOnboarding.client}/social-details`) setActive(tabNames.Social);
    else if (location.pathname === `/${userOnboarding.client}/payment-details`) setActive(tabNames.Payment);
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

export default ClientOnboarding;
