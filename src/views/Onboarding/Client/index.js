import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header';
import Tabs from './Tabs';

const ClientOnboarding = () => {
  const tabNames = {
    Account: '1',
    Profile: '2',
    Payment: '3',
  };

  const [active, setActive] = useState(tabNames.Account);

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/client-onboarding/account-details') setActive(tabNames.Account);
    else if (location.pathname === '/client-onboarding/profile-details') setActive(tabNames.Profile);
  }, [location]);

  return (
    <>
      <Header />

      <div className="px-5 py-3">
        <div className="px-2">
          <h2>Onboarding</h2>
          <Tabs tabNames={tabNames} toggleTab={toggleTab} active={active} />
        </div>
      </div>
    </>
  );
};

export default ClientOnboarding;
