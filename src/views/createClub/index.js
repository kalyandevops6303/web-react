import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Header from '../Onboarding/Header';
import Tabs from './Tabs';

const CreateClub = () => {
  const tabNames = {
    Account: '1',
    Profile: '2',
  };

  const [active, setActive] = useState(tabNames.Account);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/create-club/account-details') setActive(tabNames.Account);
  }, [location]);

  return (
    <>
      <Header />

      <div className="px-5 py-3">
        <div className="px-2">
          <h2>{location?.state?.isEditing ? 'Edit Profile' : 'Create Club'}</h2>
          <Tabs tabNames={tabNames} active={active} />
        </div>
      </div>
    </>
  );
};

export default CreateClub;
