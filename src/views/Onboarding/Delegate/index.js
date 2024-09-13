import React from 'react';
import { Home } from 'react-feather';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import Header from '../Header';
import { TabsContainer } from '../style';
import Account from '../Account';

const DelegateOnboarding = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname.includes('onboarding') && <Header />}
      <div className={`${location.pathname.includes('onboarding') ? 'px-5 py-3' : 'px-3 pt-1'} `}>
        <h2>Onboarding</h2>
        <TabsContainer className="pt-2">
          <Nav pills className="mb-2">
            <NavItem>
              <NavLink active>
                <Home className="font-medium-3 me-50" />
                <span className="fw-bold">Account</span>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent>
            <TabPane>
              <Account isDelegate />
            </TabPane>
          </TabContent>
        </TabsContainer>
      </div>
    </>
  );
};

export default DelegateOnboarding;
