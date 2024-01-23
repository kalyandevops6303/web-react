import React from 'react';
import Proptypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Clock, Home, Link, User } from 'react-feather';
import { TabsContainer } from '../style';
import Account from '../Account';
import Personal from './Personal';
import Educational from './Educational';
import Availability from './Availability';
import Social from './Social';
import EducationTabInactiveImg from '../../../assets/images/educationTabInactive.png';
import EducationTabActiveImg from '../../../assets/images/educationTabActive.png';
import { userOnboarding, userProfileEdit } from '../../../utility/constants/Constant';

const Tabs = ({ tabNames, active }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const onTabClick = (path) => {
    if (location.pathname.includes('profile-edit')) {
      navigate(path);
    }
  };

  return (
    <TabsContainer className="pt-2" isEditing={location.pathname.includes('profile-edit')}>
      <Nav pills className="mb-2">
        <NavItem
          onClick={() => {
            if (location.pathname.includes('profile-edit')) {
              onTabClick(`/${userProfileEdit.client}/account-details`);
            }
          }}
        >
          <NavLink
            active={
              location.pathname === `/${userOnboarding.client}/account-details` ||
              location.pathname === `/${userProfileEdit.client}/account-details`
            }
          >
            <Home className="font-medium-3 me-50" />
            <span className="fw-bold">Account</span>
          </NavLink>
        </NavItem>
        <NavItem
          onClick={() => {
            if (location.pathname.includes('profile-edit')) {
              onTabClick(`/${userProfileEdit.client}/personal-details`);
            }
          }}
        >
          <NavLink
            active={
              location.pathname === `/${userOnboarding.client}/personal-details` ||
              location.pathname === `/${userProfileEdit.client}/personal-details`
            }
          >
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">Personal</span>
          </NavLink>
        </NavItem>
        <NavItem
          onClick={() => {
            if (location.pathname.includes('profile-edit')) {
              onTabClick(`/${userProfileEdit.client}/educational-details`);
            }
          }}
        >
          <NavLink
            active={
              location.pathname === `/${userOnboarding.client}/educational-details` ||
              location.pathname === `/${userProfileEdit.client}/educational-details`
            }
          >
            {location.pathname === `/${userOnboarding.client}/educational-details` ||
            location.pathname === `/${userProfileEdit.client}/educational-details` ? (
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
              onTabClick(`/${userProfileEdit.client}/availability-details`);
            }
          }}
        >
          <NavLink
            active={
              location.pathname === `/${userOnboarding.client}/availability-details` ||
              location.pathname === `/${userProfileEdit.client}/availability-details`
            }
          >
            <Clock className="font-medium-3 me-50" />
            <span className="fw-bold">Availability</span>
          </NavLink>
        </NavItem>
        <NavItem
          onClick={() => {
            if (location.pathname.includes('profile-edit')) {
              onTabClick(`/${userProfileEdit.client}/social-details`);
            }
          }}
        >
          <NavLink
            active={
              location.pathname === `/${userOnboarding.client}/social-details` ||
              location.pathname === `/${userProfileEdit.client}/social-details`
            }
          >
            <Link className="font-medium-3 me-50" />
            <span className="fw-bold">Social</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId={tabNames.Account}>
          {(location.pathname === `/${userOnboarding.client}/account-details` ||
            location.pathname === `/${userProfileEdit.client}/account-details`) && <Account />}
        </TabPane>
        <TabPane tabId={tabNames.Personal}>
          {(location.pathname === `/${userOnboarding.client}/personal-details` ||
            location.pathname === `/${userProfileEdit.client}/personal-details`) && <Personal />}
        </TabPane>
        <TabPane tabId={tabNames.Educational}>
          {(location.pathname === `/${userOnboarding.client}/educational-details` ||
            location.pathname === `/${userProfileEdit.client}/educational-details`) && <Educational />}
        </TabPane>
        <TabPane tabId={tabNames.Availability}>
          {(location.pathname === `/${userOnboarding.client}/availability-details` ||
            location.pathname === `/${userProfileEdit.client}/availability-details`) && <Availability />}
        </TabPane>
        <TabPane tabId={tabNames.Social}>
          {(location.pathname === `/${userOnboarding.client}/social-details` ||
            location.pathname === `/${userProfileEdit.client}/social-details`) && <Social />}
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
