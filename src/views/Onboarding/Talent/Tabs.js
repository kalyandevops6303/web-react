import React from 'react';
import Proptypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Home, User } from 'react-feather';
import { TabsContainer } from '../style';
import Account from '../Account';
import Personal from './Personal';
import Educational from './Educational';
import Availability from './Availability';
import Social from './Social';
import { userOnboarding } from '../../../utility/constants/Constant';

const Tabs = ({ tabNames, active }) => {
  const location = useLocation();

  return (
    <TabsContainer className="pt-2">
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={location.pathname === `/${userOnboarding.talent}/account-details`}>
            <Home className="font-medium-3 me-50" />
            <span className="fw-bold">Account</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={location.pathname === `/${userOnboarding.talent}/personal-details`}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">Personal</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={location.pathname === `/${userOnboarding.talent}/educational-details`}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">Education</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={location.pathname === `/${userOnboarding.talent}/availability-details`}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">Availability</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={location.pathname === `/${userOnboarding.talent}/social-details`}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">Social</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId={tabNames.Account}>
          {location.pathname === `/${userOnboarding.talent}/account-details` && <Account tabNames={tabNames} />}
        </TabPane>
        <TabPane tabId={tabNames.Personal}>
          {location.pathname === `/${userOnboarding.talent}/personal-details` && <Personal />}
        </TabPane>
        <TabPane tabId={tabNames.Educational}>
          {location.pathname === `/${userOnboarding.talent}/educational-details` && <Educational />}
        </TabPane>
        <TabPane tabId={tabNames.Availability}>
          {location.pathname === `/${userOnboarding.talent}/availability-details` && <Availability />}
        </TabPane>
        <TabPane tabId={tabNames.Social}>
          {location.pathname === `/${userOnboarding.talent}/social-details` && <Social />}
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
};

Tabs.defaultProps = {
  tabNames: {},
  active: '',
};
