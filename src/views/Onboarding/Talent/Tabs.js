import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Clock, Home, Link, User, Shield, Crosshair } from 'react-feather';
import { TabsContainer } from '../style';
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
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionsLink, getShowHiringTab } from "../../../redux/actions/hiringActions";

const Tabs = ({ tabNames, active }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const showHiringTab = useSelector((state) => state.hiring?.showHiringTab)

  const [showTab, setShowTab] = useState(true);

  const onTabClick = (path) => {
    if (location.pathname.includes('profile-edit')) {
      navigate(path);
    }
  };

  const onFailure = () => {
    setShowTab(false);
  }

  return (
    <TabsContainer className="pt-2" isEditing={location.pathname.includes('profile-edit')}>
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
        {showHiringTab && showTab && <NavItem
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
        </NavItem>}
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
        <TabPane tabId={tabNames.Availability}>
          {(location.pathname === `/${userOnboarding.talent}/availability-details` ||
            location.pathname === `/${userProfileEdit.talent}/availability-details`) && <Availability />}
        </TabPane>
        <TabPane tabId={tabNames.Social}>
          {(location.pathname === `/${userOnboarding.talent}/social-details` ||
            location.pathname === `/${userProfileEdit.talent}/social-details`) && <Social />}
        </TabPane>
        <TabPane tabId={tabNames.Payment}>
          {location.pathname.includes('payment-details') ||
            location.pathname === `/${userProfileEdit.talent}/payment-details` ? (
            <Payment />
          ) : null}
        </TabPane>
        <TabPane tabId={tabNames.InternHiring}>
          {(location.pathname === `/${userProfileEdit.talent}/intern-hiring` || 
            location.pathname === `/${userOnboarding.talent}/intern-hiring`
          )? <InternHiring /> : null}
        </TabPane>
        <TabPane tabId={tabNames.InternXobinHiring}>
          {location.pathname.includes('intern-xobin-hiring') ||
            location.pathname === `/${userProfileEdit.talent}/intern-xobin-hiring` || 
            location.pathname === `/${userOnboarding.talent}/intern-xobin-hiring`
            ? (
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
