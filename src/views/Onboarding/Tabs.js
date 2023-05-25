/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Home, Shield, User } from 'react-feather';
import { TabsContainer } from './style';
import Account from './Account';

const Tabs = ({ tabNames, toggleTab, active }) => (
  <TabsContainer className="pt-2">
    <Nav pills className="mb-2">
      <NavItem>
        <NavLink active={active === tabNames.Account} onClick={() => toggleTab(tabNames.Account)}>
          <Home className="font-medium-3 me-50" />
          <span className="fw-bold">Account</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={active === tabNames.Profile} onClick={() => toggleTab(tabNames.Profile)}>
          <User className="font-medium-3 me-50" />
          <span className="fw-bold">Profile</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={active === tabNames.Payment} onClick={() => toggleTab(tabNames.Payment)}>
          <Shield className="font-medium-3 me-50" />
          <span className="fw-bold">Payment</span>
        </NavLink>
      </NavItem>
    </Nav>
    <TabContent activeTab={active}>
      <TabPane tabId={tabNames.Account}>
        <Account />
      </TabPane>
      <TabPane tabId={tabNames.Profile} />
      <TabPane tabId={tabNames.Payment} />
    </TabContent>
  </TabsContainer>
);

Tabs.propTypes = {
  tabNames: PropTypes.object,
  active: PropTypes.string,
  toggleTab: PropTypes.func,
};

export default Tabs;
