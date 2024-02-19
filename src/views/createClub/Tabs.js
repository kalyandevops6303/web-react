import React from 'react';
import Proptypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Home, User } from 'react-feather';
import Account from './Account';
import Profile from './Profile';
import { TabsContainer } from '../Onboarding/style';
import { userProfileEdit } from '../../utility/constants/Constant';

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
              onTabClick(`/${userProfileEdit.club}/account-details`);
            }
          }}
        >
          <NavLink
            active={
              location.pathname === '/create-club/account-details' ||
              location.pathname === `/${userProfileEdit.club}/account-details`
            }
          >
            <Home className="font-medium-3 me-50" />
            <span className="fw-bold">Account</span>
          </NavLink>
        </NavItem>
        <NavItem
          onClick={() => {
            if (location.pathname.includes('profile-edit')) {
              onTabClick(`/${userProfileEdit.club}/profile-details`);
            }
          }}
        >
          <NavLink
            active={
              location.pathname === '/create-club/profile-details' ||
              location.pathname === `/${userProfileEdit.club}/profile-details`
            }
          >
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">Profile</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId={tabNames.Account}>
          {(location.pathname === '/create-club/account-details' ||
            location.pathname === `/${userProfileEdit.club}/account-details`) && <Account />}
          {(location.pathname === '/create-club/profile-details' ||
            location.pathname === `/${userProfileEdit.club}/profile-details`) && <Profile />}
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
