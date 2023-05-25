import React from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Home, Shield, User } from 'react-feather';
import { TabsContainer } from './style';
import Account from './Account';

const Tabs = ({ tabNames, toggleTab, active }) => {
  return (
    <TabsContainer className="pt-2">
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink
            active={active === tabNames.Account}
            onClick={() => toggleTab(tabNames.Account)}
          >
            <Home className="font-medium-3 me-50" />
            <span className="fw-bold">Account</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === tabNames.Profile}
            onClick={() => toggleTab(tabNames.Profile)}
          >
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">Profile</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === tabNames.Payment}
            onClick={() => toggleTab(tabNames.Payment)}
          >
            <Shield className="font-medium-3 me-50" />
            <span className="fw-bold">Payment</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId={tabNames.Account}>
          <Account />
        </TabPane>
        <TabPane tabId={tabNames.Profile}></TabPane>
        <TabPane tabId={tabNames.Payment}></TabPane>
      </TabContent>
    </TabsContainer>
  );
};

export default Tabs;
