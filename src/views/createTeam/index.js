import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Header from '../Onboarding/Header';
import Tabs from './Tabs';

const CreateTeam = () => {
  const tabNames = {
    Profile: '1',
  };

  const [active, setActive] = useState(tabNames.Profile);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/create-team/profile-details') setActive(tabNames.Profile);
  }, [location]);

  return (
    <>
      <Header />

      <div className="px-5 py-3">
        <div className="px-2">
          <h2>{location?.state?.isEditing ? 'Edit Profile' : 'Create Team'}</h2>
          <Tabs tabNames={tabNames} active={active} />
        </div>
      </div>
    </>
  );
};

export default CreateTeam;
