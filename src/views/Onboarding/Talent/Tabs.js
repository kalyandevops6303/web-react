import React, { useEffect , useState } from 'react';
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
import { saveProfileDetails } from '../../../redux/actions/talentOnboardingActions';

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
    } if (name === 'trumio_talent' && checked === false && selectProgram?.flextern === false) {
      toast.error('Minimum One Program has to be selected');
      return;
    }
    setSelectProgram((prev) => ({
      ...prev,
      [name]: checked,
    }));
    dispatch(saveProfileDetails(reqData));
    if (name === 'flextern') {
      dispatch(setTalentBooleansFlextern(checked));
    } else if (name === 'trumio_talent') {
      dispatch(setTalentBooleanTrumioTalent(checked));
    }
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
  }, [location.pathname, userData, talentOnboardingUserDetails, flexternBoolean, trumioTalent]);

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
        <NavItem
          onClick={() => {
            if (location.pathname.includes('profile-edit')) {
              onTabClick(`/${userProfileEdit.talent}/account-details`);
            }
          }}
        >
          <NavLink
            active={
              location.pathname === `/${userOnboarding.talent}/account-details` ||
              location.pathname === `/${userProfileEdit.talent}/account-details`
            }
          >
            <Home className="font-medium-3 me-50" />
            <span className="fw-bold">Account</span>
          </NavLink>
        </NavItem>
        <NavItem
          onClick={() => {
            if (location.pathname.includes('profile-edit')) {
              onTabClick(`/${userProfileEdit.talent}/personal-details`);
            }
          }}
        >
          <NavLink
            active={
              location.pathname === `/${userOnboarding.talent}/personal-details` ||
              location.pathname === `/${userProfileEdit.talent}/personal-details`
            }
          >
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">Personal</span>
          </NavLink>
        </NavItem>
        <NavItem
          onClick={() => {
            if (location.pathname.includes('profile-edit')) {
              onTabClick(`/${userProfileEdit.talent}/educational-details`);
            }
          }}
        >
          <NavLink
            active={
              location.pathname === `/${userOnboarding.talent}/educational-details` ||
              location.pathname === `/${userProfileEdit.talent}/educational-details`
            }
          >
            {location.pathname === `/${userOnboarding.talent}/educational-details` ||
            location.pathname === `/${userProfileEdit.talent}/educational-details` ? (
              <img src={EducationTabActiveImg} alt="education-active" width={20} height={20} className="me-50" />
            ) : (
              <img src={EducationTabInactiveImg} alt="education-inactive" width={20} height={20} className="me-50" />
            )}
            <span className="fw-bold">Education</span>
          </NavLink>
        </NavItem>
        <NavItem
          onClick={() => {
            if (location.pathname.includes('profile-edit')) {
              onTabClick(`/${userProfileEdit.talent}/social-details`);
            }
          }}
        >
          <NavLink
            active={
              location.pathname === `/${userOnboarding.talent}/social-details` ||
              location.pathname === `/${userProfileEdit.talent}/social-details`
            }
          >
            <Link className="font-medium-3 me-50" />
            <span className="fw-bold">Social</span>
          </NavLink>
        </NavItem>
        <NavItem
          onClick={() => {
            if (location.pathname.includes('profile-edit')) {
              onTabClick(`/${userProfileEdit.talent}/additional-details`);
            }
          }}
        >
          <NavLink
            active={
              location.pathname === `/${userOnboarding.talent}/additional-details` ||
              location.pathname === `/${userProfileEdit.talent}/additional-details`
            }
          >
            <FileText className="font-medium-3 me-50" />
            <span className="fw-bold">Additional Information</span>
          </NavLink>
        </NavItem>
        <NavItem
          onClick={() => {
            if (location.pathname.includes('profile-edit')) {
              onTabClick(`/${userProfileEdit.talent}/availability-details`);
            }
          }}
        >
          <NavLink
            active={
              location.pathname === `/${userOnboarding.talent}/availability-details` ||
              location.pathname === `/${userProfileEdit.talent}/availability-details`
            }
          >
            <Clock className="font-medium-3 me-50" />
            <span className="fw-bold">Availability</span>
          </NavLink>
        </NavItem>
        <NavItem
          onClick={() => {
            if (location.pathname.includes('profile-edit')) {
              onTabClick(`/${userProfileEdit.talent}/payment-details`);
            }
          }}
        >
          <NavLink
            active={
              location.pathname.includes('payment-details') ||
              location.pathname === `/${userProfileEdit.talent}/payment-details`
            }
          >
            <Shield className="font-medium-3 me-50" />
            <span className="fw-bold">Payment</span>
          </NavLink>
        </NavItem>
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
