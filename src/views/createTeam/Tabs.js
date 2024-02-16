import React from 'react';
import Proptypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { User } from 'react-feather';
import Profile from './Profile';
import { TabsContainer } from '../Onboarding/style';
import { userProfileEdit } from '../../utility/constants/Constant';

const Tabs = ({ tabNames, active }) => {
  const location = useLocation();

  return (
    <TabsContainer className="pt-2">
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink
            active={
              location.pathname === '/create-team/profile-details' ||
              location.pathname === `/${userProfileEdit.team}/profile-details`
            }
          >
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">Profile</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId={tabNames.Profile}>
          {(location.pathname === '/create-team/profile-details' ||
            location.pathname === `/${userProfileEdit.team}/profile-details`) && <Profile />}
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
