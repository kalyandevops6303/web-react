import React, { useState } from 'react';
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
