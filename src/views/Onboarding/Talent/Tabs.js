import React from 'react';
import Proptypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Home, User } from 'react-feather';
import { TabsContainer } from '../style';
import Account from '../Account';
import Profile from './Profile';

const Tabs = ({ tabNames, toggleTab, active }) => {
  const location = useLocation();

  return (
    <TabsContainer className="pt-2">
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={location.pathname === '/talent-onboarding/account-details'}>
            <Home className="font-medium-3 me-50" />
            <span className="fw-bold">Account</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={location.pathname === '/talent-onboarding/profile-details'}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">Profile</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId={tabNames.Account}>
          {location.pathname === '/talent-onboarding/account-details' && (
            <Account tabNames={tabNames} toggleTab={toggleTab} />
          )}
        </TabPane>
        <TabPane tabId={tabNames.Profile}>
          {location.pathname === '/talent-onboarding/profile-details' && (
            <Profile tabNames={tabNames} toggleTab={toggleTab} active={active} />
          )}
        </TabPane>
        <TabPane tabId={tabNames.Payment}>Payment</TabPane>
      </TabContent>
    </TabsContainer>
  );
};
export default Tabs;

Tabs.propTypes = {
  tabNames: Proptypes.object,
  active: Proptypes.string,
  toggleTab: Proptypes.func,
};

Tabs.defaultProps = {
  tabNames: {},
  active: '',
  toggleTab: () => {},
};
