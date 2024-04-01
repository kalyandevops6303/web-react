import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ArrowLeft } from 'react-feather';
import Tabs from './Tabs';
import { BackButtonContainer } from '../Onboarding/style';
import theme from '../../configs/themeVariables';
import { getItemFromSession, removeItemFromSession } from '../../utility/sessesionStorageControl';
import { setActiveNavTab } from '../../redux/reducers/activeNavTab';
import { userProfileEdit } from '../../utility/constants/Constant';
import { CircularBackButtonContainer } from '../styled';

const CreateTeam = () => {
  const tabNames = {
    Profile: '1',
  };

  const [active, setActive] = useState(tabNames.Profile);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      location.pathname === '/create-team/profile-details' ||
      location.pathname === `/${userProfileEdit.team}/profile-details`
    )
      setActive(tabNames.Profile);
  }, [location]);

  const onBackClick = () => {
    navigate(getItemFromSession('backRouteForProfileEdit'));
    removeItemFromSession('backRouteForProfileEdit');
  };

  useEffect(() => {
    dispatch(setActiveNavTab(''));
  }, []);

  return (
    <div className={`${location.pathname.includes('create-team') ? 'px-5 py-2' : 'px-3 pt-1'} `}>
      <div className="px-2">
        {location.pathname.includes('create-team') ? (
          <CircularBackButtonContainer
            className="d-flex align-items-center cursor-pointer"
            onClick={() => navigate('/dashboard')}
          >
            <div className="back-icon-container">
              <ArrowLeft size={18} color={theme.white} />
            </div>
            <p className="fw-light mb-0 ms-50 font-medium-2">Create Team</p>
          </CircularBackButtonContainer>
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
  );
};

export default CreateTeam;
