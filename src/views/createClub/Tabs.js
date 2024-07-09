import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Home, User } from 'react-feather';
import Account from './Account';
import Profile from './Profile';
import { TabsContainer } from '../Onboarding/style';
import { userProfileEdit } from '../../utility/constants/Constant';
import DraftSavedModal from '../modals/DraftSavedModal';

const Tabs = ({ tabNames, active }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [draftSavedModal, setDraftSavedModal] = useState(false);
  const toggleDraftSavedModal = () => setDraftSavedModal(!draftSavedModal);

  const onTabClick = (path) => {
    if (location.pathname.includes('profile-edit')) {
      navigate(path);
    }
  };
  const isAccountDetailsRoute =
    /^\/create-club\/account-details(\/[^/]+)?$/.test(location.pathname) ||
    location.pathname === `/${userProfileEdit.club}/account-details`;

  const isProfileDetailsRoute =
    /^\/create-club\/profile-details(\/[^/]+)?$/.test(location.pathname) ||
    location.pathname === `/${userProfileEdit.club}/profile-details`;

  return (
    <>
      {draftSavedModal && (
        <DraftSavedModal
          modal={draftSavedModal}
          toggleModal={toggleDraftSavedModal}
          path="Clubs > My Clubs > Drafts Or View Draft"
          onPrimaryBtnClick={() =>
            navigate('/clubs/my_clubs', {
              state: {
                isDraftClubs: true,
              },
            })
          }
        />
      )}
      <TabsContainer className="pt-2" isEditing={location.pathname.includes('profile-edit')}>
        <Nav pills className="mb-2">
          <NavItem
            onClick={() => {
              if (location.pathname.includes('profile-edit')) {
                onTabClick(`/${userProfileEdit.club}/account-details`);
              }
            }}
          >
            <NavLink active={isAccountDetailsRoute || location.pathname === `/${userProfileEdit.club}/account-details`}>
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
            <NavLink active={isProfileDetailsRoute || location.pathname === `/${userProfileEdit.club}/profile-details`}>
              <User className="font-medium-3 me-50" />
              <span className="fw-bold">Profile</span>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={active}>
          <TabPane tabId={tabNames.Account}>
            {(isAccountDetailsRoute || location.pathname === `/${userProfileEdit.club}/account-details`) && <Account setDraftSavedModal={setDraftSavedModal} />}
          </TabPane>
          <TabPane tabId={tabNames.Profile}>
            {(isProfileDetailsRoute || location.pathname === `/${userProfileEdit.club}/profile-details`) && <Profile setDraftSavedModal={setDraftSavedModal} />}
          </TabPane>
        </TabContent>
      </TabsContainer>
    </>
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
