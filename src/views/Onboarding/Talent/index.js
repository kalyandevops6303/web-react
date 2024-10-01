import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import { useDispatch } from 'react-redux';
import Header from '../Header';
import Tabs from './Tabs';
import { userOnboarding, userProfileEdit } from '../../../utility/constants/Constant';
import theme from '../../../configs/themeVariables';
import { BackButtonContainer } from '../style';
import { getItemFromSession, removeItemFromSession } from '../../../utility/sessesionStorageControl';
import { setActiveNavTab } from '../../../redux/reducers/activeNavTab';

const TalentOnboarding = () => {
  const tabNames = {
    Account: '1',
    Personal: '2',
    Educational: '3',
    Social: '4',
    Additional: '5',
    Availability: '6',
    Payment: '7',
    InternHiring: '8',
    InternXobinHiring: '9',
  };

  const [active, setActive] = useState(tabNames.Account);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      location.pathname === `/${userOnboarding.talent}/account-details` ||
      location.pathname === `/${userProfileEdit.talent}/account-details`
    )
      setActive(tabNames.Account);
    else if (
      location.pathname === `/${userOnboarding.talent}/personal-details` ||
      location.pathname === `/${userProfileEdit.talent}/personal-details`
    )
      setActive(tabNames.Personal);
    else if (
      location.pathname === `/${userOnboarding.talent}/educational-details` ||
      location.pathname === `/${userProfileEdit.talent}/educational-details`
    )
      setActive(tabNames.Educational);
    else if (
        location.pathname === `/${userOnboarding.talent}/social-details` ||
        location.pathname === `/${userProfileEdit.talent}/social-details`
    )
      setActive(tabNames.Social);
    else if (
        location.pathname === `/${userOnboarding.talent}/additional-information-details` ||
        location.pathname === `/${userProfileEdit.talent}/additional-information-details`
    )
      setActive(tabNames.Additional);
    else if (
      location.pathname === `/${userOnboarding.talent}/availability-details` ||
      location.pathname === `/${userProfileEdit.talent}/availability-details`
    )
      setActive(tabNames.Availability);
    else if (
      location.pathname === `/${userOnboarding.talent}/intern-hiring` ||
      location.pathname === `/${userProfileEdit.talent}/intern-hiring`
    )
      setActive(tabNames.InternHiring);
    else if (
      location.pathname === `/${userOnboarding.talent}/intern-xobin-hiring` ||
      location.pathname === `/${userProfileEdit.talent}/intern-xobin-hiring`
    )
      setActive(tabNames.InternXobinHiring);
    else if (
      location.pathname.includes('/payment-details') ||
      location.pathname === `/${userProfileEdit.talent}/payment-details`
    )
      setActive(tabNames.Payment);
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

export default TalentOnboarding;
