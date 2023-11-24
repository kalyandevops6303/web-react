import React from 'react';
import Proptypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Home, User } from 'react-feather';
import Account from './Account';
import Profile from './Profile';
import { TabsContainer } from '../Onboarding/style';

const Tabs = ({ tabNames, active }) => {
  const location = useLocation();

  return (
    <TabsContainer className="pt-2">
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={location.pathname === '/create-club/account-details'}>
            <Home className="font-medium-3 me-50" />
            <span className="fw-bold">Account</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={location.pathname === '/create-club/profile-details'}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">Profile</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId={tabNames.Account}>
          {location.pathname === '/create-club/account-details' && <Account />}
          {location.pathname === '/create-club/profile-details' && <Profile />}
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
