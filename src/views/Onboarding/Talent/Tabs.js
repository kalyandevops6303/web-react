import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { Nav, NavItem, NavLink, TabContent, TabPane, Input } from 'reactstrap';
import { Clock, Home, Link, User, Shield, FileText } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { TabsContainer, ProgramCheckBox } from '../style';
import Account from '../Account';
import Personal from './Personal';
import Educational from './Educational';
import Availability from './Availability';
import Social from './Social';
import Payment from './Payment';
import { userOnboarding, userProfileEdit } from '../../../utility/constants/Constant';
import EducationTabInactiveImg from '../../../assets/images/educationTabInactive.png';
import EducationTabActiveImg from '../../../assets/images/educationTabActive.png';
import InternHiring from './InternHiring';
import InternXobinHiring from './InternXobinHiring';
import Additional from './Additional';
import { selectFlexternBoolean, selectTrumioTalent, selectUserData } from '../../../redux/selectors/authSelectors';
import { userDetails } from '../../../redux/selectors/talentOnboardingSelectors';
import { setTalentBooleanTrumioTalent, setTalentBooleansFlextern } from '../../../redux/reducers/auth';
import { getUserDetails, saveProfileDetails } from '../../../redux/actions/talentOnboardingActions';
import { getUserData } from '../../../redux/actions/authActions';

const Tabs = ({ tabNames, active }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectProgram, setSelectProgram] = useState({
    flextern: false,
    trumio_talent: false,
  });
  const flexternBoolean = useSelector(selectFlexternBoolean);
  const trumioTalent = useSelector(selectTrumioTalent);

  const talentOnboardingUserDetails = useSelector(userDetails);
  const userData = useSelector(selectUserData);
  // const showHiringTab = useSelector((state) => state.hiring?.showHiringTab);
  const onTabClick = (path) => {
    if (location.pathname.includes('profile-edit')) {
      navigate(path);
    }
  };
  const handleProgramChange = (event) => {
    const { name, checked } = event.target;
    const reqData = {};
    reqData[name] = checked;
    if (name === 'flextern' && checked === false && selectProgram?.trumio_talent === false) {
      toast.error('Minimum One Program has to be selected');
      return;
    }
    if (name === 'trumio_talent' && checked === false && selectProgram?.flextern === false) {
      toast.error('Minimum One Program has to be selected');
      return;
    }
    if(selectProgram?.flextern === true && selectProgram?.trumio_talent === true){
      if(location.pathname.includes('/additional-details') && name === 'flextern' && checked === false) {
        toast.error('Flexternship cannot be unchecked under Additional Information');
        return ;
      } else if((location.pathname.includes('/availability-details') || location.pathname.includes('/payment-details')) && name === 'trumio_talent' && checked === false) {
        toast.error('Project cannot be unchecked under Additional Information');
        return ;
      }
    }
    setSelectProgram((prev) => ({
      ...prev,
      [name]: checked,
    }));
    if (name === 'flextern') {
      dispatch(setTalentBooleansFlextern(checked));
    } else if (name === 'trumio_talent') {
      dispatch(setTalentBooleanTrumioTalent(checked));
    }
    dispatch(saveProfileDetails(reqData));
    dispatch(getUserDetails());
    dispatch(getUserData());
  };
  const isTabDisabled = (tabName) => {
    if (selectProgram.flextern && selectProgram.trumio_talent) return false;
    if (selectProgram.flextern && !selectProgram.trumio_talent) {
      return tabName === 'Availability' || tabName === 'Payment';
    }
    if (!selectProgram.flextern && selectProgram.trumio_talent) {
      return tabName === 'Additional';
    }
    return false;
  };

  const renderNavItem = (onboardingPath, editPath, icon, text, tabName) => {
    const isActive = location.pathname === onboardingPath || location.pathname === editPath;
    const isDisabled = isTabDisabled(tabName);
    return (
      <NavItem
        onClick={() => {
          if (!isDisabled) {
            onTabClick(location.pathname.includes('profile-edit') ? editPath : onboardingPath);
          }
        }}
      >
        <NavLink active={isActive} className={isDisabled ? 'disabled-tab' : ''}>
          {React.cloneElement(icon, { className: `font-medium-3 me-50 ${isDisabled ? 'text-muted' : ''}` })}
          <span className={`fw-bold ${isDisabled ? 'text-muted' : ''}`}>{text}</span>
        </NavLink>
      </NavItem>
    );
  };
  useEffect(() => {
    if (location.pathname.includes('profile-edit')) {
      dispatch(setTalentBooleansFlextern(userData?.talent_info?.flextern));
      dispatch(setTalentBooleanTrumioTalent(userData?.talent_info?.trumio_talent));
      setSelectProgram((prev) => ({
        ...prev,
        flextern: userData?.talent_info?.flextern,
        trumio_talent: userData?.talent_info?.trumio_talent,
      }));
    } else if (location.pathname.includes('talent-onboarding')) {
      if (talentOnboardingUserDetails?.talent_info) {
        dispatch(setTalentBooleansFlextern(talentOnboardingUserDetails?.talent_info?.flextern));
        dispatch(setTalentBooleanTrumioTalent(talentOnboardingUserDetails?.talent_info?.trumio_talent));
        setSelectProgram((prev) => ({
          ...prev,
          flextern: talentOnboardingUserDetails?.talent_info?.flextern,
          trumio_talent: talentOnboardingUserDetails?.talent_info?.trumio_talent,
        }));
      } else {
        setSelectProgram((prev) => ({
          ...prev,
          flextern: flexternBoolean,
          trumio_talent: trumioTalent,
        }));
      }
    } else {
      setSelectProgram((prev) => ({
        ...prev,
        flextern: flexternBoolean,
        trumio_talent: trumioTalent,
      }));
    }
  }, [location.pathname, talentOnboardingUserDetails, userData]);

  return (
    <TabsContainer className="pt-2" isEditing={location.pathname.includes('profile-edit')}>
      <div className="mb-2 d-flex justify-content-center gap-2">
        <ProgramCheckBox active={selectProgram?.flextern}>
          <div className="form-check form-check-inline checkbox-custom-margin">
            <Input type="checkbox" name="flextern" checked={selectProgram?.flextern} onChange={handleProgramChange} />{' '}
            Flexternship
          </div>
        </ProgramCheckBox>
        <ProgramCheckBox active={selectProgram?.trumio_talent}>
          <div className="form-check form-check-inline checkbox-custom-margin">
            <Input
              type="checkbox"
              name="trumio_talent"
              checked={selectProgram?.trumio_talent}
              onChange={handleProgramChange}
            />{' '}
            Project
          </div>
        </ProgramCheckBox>
      </div>
      <Nav pills className="mb-2">
        {renderNavItem(
          `/${userOnboarding.talent}/account-details`,
          `/${userProfileEdit.talent}/account-details`,
          <Home />,
          'Account',
          'Account',
        )}
        {renderNavItem(
          `/${userOnboarding.talent}/personal-details`,
          `/${userProfileEdit.talent}/personal-details`,
          <User />,
          'Personal',
          'Personal',
        )}
        {renderNavItem(
          `/${userOnboarding.talent}/educational-details`,
          `/${userProfileEdit.talent}/educational-details`,
          <img
            src={location.pathname.includes('/educational-details') ? EducationTabActiveImg : EducationTabInactiveImg}
            alt="education"
            width={20}
            height={20}
          />,
          'Education',
          'Educational',
        )}
        {renderNavItem(
          `/${userOnboarding.talent}/social-details`,
          `/${userProfileEdit.talent}/social-details`,
          <Link />,
          'Social',
          'Social',
        )}
        {renderNavItem(
          `/${userOnboarding.talent}/additional-details`,
          `/${userProfileEdit.talent}/additional-details`,
          <FileText />,
          'Additional Information',
          'Additional',
        )}
        {renderNavItem(
          `/${userOnboarding.talent}/availability-details`,
          `/${userProfileEdit.talent}/availability-details`,
          <Clock />,
          'Availability',
          'Availability',
        )}
        {renderNavItem(
          `/${userOnboarding.talent}/payment-details`,
          `/${userProfileEdit.talent}/payment-details`,
          <Shield />,
          'Payment',
          'Payment',
        )}
        {/* {showHiringTab && <NavItem
          onClick={() => {
            if (location.pathname.includes('profile-edit')) {
              onTabClick(`/${userProfileEdit.talent}/intern-hiring`);
            }
            else {
              onTabClick(`/${userOnboarding.talent}/intern-hiring`);
            }
          }}
        >
          <NavLink
            active={
              location.pathname.includes(`/intern-hiring`) ||
              location.pathname === `/${userProfileEdit.talent}/intern-hiring`
            }
          >
            <Crosshair className="font-medium-3 me-50" />
            <span className="fw-bold">Get Hired</span>
          </NavLink>
        </NavItem>} */}
        {/* {showHiringTab && showTab && <NavItem
          onClick={() => {
            if (location.pathname.includes('profile-edit')) {
              onTabClick(`/${userProfileEdit.talent}/intern-xobin-hiring`);
            }
          }}
        >
          <NavLink
            active={
              location.pathname.includes(`/intern-xobin-hiring`) ||
              location.pathname === `/${userProfileEdit.talent}/intern-xobin-hiring`
            }
          >
            <Crosshair className="font-medium-3 me-50" />
            <span className="fw-bold">Get Hired</span>
          </NavLink>
        </NavItem>} */}
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId={tabNames.Account}>
          {(location.pathname === `/${userOnboarding.talent}/account-details` ||
            location.pathname === `/${userProfileEdit.talent}/account-details`) && <Account tabNames={tabNames} />}
        </TabPane>
        <TabPane tabId={tabNames.Personal}>
          {(location.pathname === `/${userOnboarding.talent}/personal-details` ||
            location.pathname === `/${userProfileEdit.talent}/personal-details`) && <Personal />}
        </TabPane>
        <TabPane tabId={tabNames.Educational}>
          {(location.pathname === `/${userOnboarding.talent}/educational-details` ||
            location.pathname === `/${userProfileEdit.talent}/educational-details`) && <Educational />}
        </TabPane>
        <TabPane tabId={tabNames.Additional}>
          {(location.pathname === `/${userOnboarding.talent}/additional-details` ||
            location.pathname === `/${userProfileEdit.talent}/additional-details`) && <Additional />}
        </TabPane>
        <TabPane tabId={tabNames.Social}>
          {(location.pathname === `/${userOnboarding.talent}/social-details` ||
            location.pathname === `/${userProfileEdit.talent}/social-details`) && <Social />}
        </TabPane>
        <TabPane tabId={tabNames.Availability}>
          {(location.pathname === `/${userOnboarding.talent}/availability-details` ||
            location.pathname === `/${userProfileEdit.talent}/availability-details`) && <Availability />}
        </TabPane>
        <TabPane tabId={tabNames.Payment}>
          {location.pathname.includes('payment-details') ||
          location.pathname === `/${userProfileEdit.talent}/payment-details` ? (
            <Payment />
          ) : null}
        </TabPane>
        <TabPane tabId={tabNames.InternHiring}>
          {location.pathname === `/${userProfileEdit.talent}/intern-hiring` ||
          location.pathname === `/${userOnboarding.talent}/intern-hiring` ? (
            <InternHiring />
          ) : null}
        </TabPane>
        <TabPane tabId={tabNames.InternXobinHiring}>
          {location.pathname.includes('intern-xobin-hiring') ||
          location.pathname === `/${userProfileEdit.talent}/intern-xobin-hiring` ||
          location.pathname === `/${userOnboarding.talent}/intern-xobin-hiring` ? (
            <InternXobinHiring />
          ) : null}
        </TabPane>
      </TabContent>
    </TabsContainer>
  );
};
export default Tabs;

Tabs.propTypes = {
  tabNames: Proptypes.object,
  active: Proptypes.string,
};

Tabs.defaultProps = {
  tabNames: {},
  active: '',
};
