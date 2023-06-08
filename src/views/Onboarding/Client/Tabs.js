import React from 'react';
import Proptypes from 'prop-types';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Home, Shield, User } from 'react-feather';
import { TabsContainer } from '../style';
import Account from '../Account';
import Profile from './Profile';

const Tabs = ({ tabNames, toggleTab, active }) => (
  <TabsContainer className="pt-2">
    <Nav pills className="mb-2">
      <NavItem>
        <NavLink active={active === tabNames.Account}>
          <Home className="font-medium-3 me-50" />
          <span className="fw-bold">Account</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={active === tabNames.Profile}>
          <User className="font-medium-3 me-50" />
          <span className="fw-bold">Profile</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={active === tabNames.Payment}>
          <Shield className="font-medium-3 me-50" />
          <span className="fw-bold">Payment</span>
        </NavLink>
      </NavItem>
    </Nav>
    <TabContent activeTab={active}>
      <TabPane tabId={tabNames.Account}>
        <Account tabNames={tabNames} toggleTab={toggleTab} />
      </TabPane>
      <TabPane tabId={tabNames.Profile}>
        <Profile tabNames={tabNames} toggleTab={toggleTab} active={active} />
      </TabPane>
      <TabPane tabId={tabNames.Payment}>Payment</TabPane>
    </TabContent>
  </TabsContainer>
);

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
