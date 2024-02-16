import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ArrowLeft } from 'react-feather';
import Header from '../Onboarding/Header';
import Tabs from './Tabs';
import { BackButtonContainer } from '../Onboarding/style';
import theme from '../../configs/themeVariables';
import { getItemFromSession, removeItemFromSession } from '../../utility/sessesionStorageControl';
import { setActiveNavTab } from '../../redux/reducers/activeNavTab';

const CreateClub = () => {
  const tabNames = {
    Account: '1',
    Profile: '2',
  };

  const [active, setActive] = useState(tabNames.Account);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === '/create-club/account-details') setActive(tabNames.Account);
  }, [location]);

  const onBackClick = () => {
    navigate(getItemFromSession('backRouteForProfileEdit'));
    removeItemFromSession('backRouteForProfileEdit');
  };

  useEffect(() => {
    dispatch(setActiveNavTab(''));
  }, []);

  return (
    <>
      {location.pathname.includes('create-club') && <Header />}

      <div className={`${location.pathname.includes('create-club') ? 'px-5 py-3' : 'px-3 pt-1'} `}>
        <div className="px-2">
          {location.pathname.includes('create-club') ? (
            <h2>Create Club</h2>
          ) : (
            <BackButtonContainer>
              <div className="d-flex align-items-center upload-button cursor-pointer" onClick={onBackClick}>
                <div className="add-icon-container">
                  <ArrowLeft size={18} color={theme.white} />
                </div>
                <h5 className="fw-normal">Back</h5>
              </div>
            </BackButtonContainer>
          )}
          <Tabs tabNames={tabNames} active={active} />
        </div>
      </div>
    </>
  );
};

export default CreateClub;
