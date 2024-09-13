import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import { useDispatch } from 'react-redux';
import Header from '../Header';
import Tabs from './Tabs';
import { userOnboarding, userProfileEdit } from '../../../utility/constants/Constant';
import theme from '../../../configs/themeVariables';
import { setActiveNavTab } from '../../../redux/reducers/activeNavTab';
import { BackButtonContainer } from '../style';
import { getItemFromSession, removeItemFromSession } from '../../../utility/sessesionStorageControl';
import { clearAllFormData } from '../../../redux/reducers/formData';
import DelegateOnboarding from '../Delegate';
import { getItem } from '../../../utility/localStorageControl';

const ClientOnboarding = () => {
  const tabNames = {
    Account: '1',
    Personal: '2',
    Educational: '3',
    Availability: '4',
    Social: '5',
    Payment: '6',
  };
  const isDelegate = getItem('isDelegate');

  const [active, setActive] = useState(tabNames.Account);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      location.pathname === `/${userOnboarding.client}/account-details` ||
      location.pathname === `/${userProfileEdit.client}/account-details`
    )
      setActive(tabNames.Account);
    else if (
      location.pathname === `/${userOnboarding.client}/personal-details` ||
      location.pathname === `/${userProfileEdit.client}/personal-details`
    )
      setActive(tabNames.Personal);
    else if (
      location.pathname === `/${userOnboarding.client}/educational-details` ||
      location.pathname === `/${userProfileEdit.client}/educational-details`
    )
      setActive(tabNames.Educational);
    else if (
      location.pathname === `/${userOnboarding.client}/availability-details` ||
      location.pathname === `/${userProfileEdit.client}/availability-details`
    )
      setActive(tabNames.Availability);
    else if (
      location.pathname === `/${userOnboarding.client}/social-details` ||
      location.pathname === `/${userProfileEdit.client}/social-details`
    )
      setActive(tabNames.Social);
    else if (
      location.pathname === `/${userOnboarding.client}/payment-details` ||
      location.pathname === `/${userProfileEdit.client}/payment-details`
    )
      setActive(tabNames.Payment);
  }, [location]);

  const onBackClick = () => {
    if (location?.pathname.includes('/client-profile-edit/account-details')) {
      dispatch(clearAllFormData());
    }
    navigate(getItemFromSession('backRouteForProfileEdit'));
    removeItemFromSession('backRouteForProfileEdit');
  };

  useEffect(() => {
    dispatch(setActiveNavTab(''));
  }, []);

  if (isDelegate) {
    return <DelegateOnboarding />;
  }

  return (
    <>
      {location.pathname.includes('onboarding') && <Header />}

      <div className={`${location.pathname.includes('onboarding') ? 'px-5 py-3' : 'px-3 pt-1'} `}>
        <div className="px-2">
          {location.pathname.includes('onboarding') ? (
            <h2>Onboarding</h2>
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

export default ClientOnboarding;
