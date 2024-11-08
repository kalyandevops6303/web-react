import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { User } from 'react-feather';
import Profile from './Profile';
import { TabsContainer } from '../Onboarding/style';
import { userProfileEdit } from '../../utility/constants/Constant';
import DraftSavedModal from '../modals/DraftSavedModal';

const Tabs = ({ tabNames, active }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [draftSavedModal, setDraftSavedModal] = useState(false);
  const toggleDraftSavedModal = () => setDraftSavedModal(!draftSavedModal);
  const isProfileDetailsRoute =
    /^\/create-team\/profile-details(\/[^/]+)?$/.test(location.pathname) ||
    location.pathname === `/${userProfileEdit.team}/profile-details`;
  return (
    <>
      {draftSavedModal && (
        <DraftSavedModal
          modal={draftSavedModal}
          toggleModal={toggleDraftSavedModal}
          path="My Teams > Teams > Drafts Or View Draft"
          onPrimaryBtnClick={() =>
            navigate('/my-teams/teams', {
              state: {
                isDraftTeams: true,
              },
            })
          }
        />
      )}
      <TabsContainer className="pt-2">
        <Nav pills className="mb-2">
          <NavItem>
            <NavLink active={isProfileDetailsRoute || location.pathname === `/${userProfileEdit.team}/profile-details`}>
              <User className="font-medium-3 me-50" />
              <span className="fw-bold">Profile</span>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={active}>
          <TabPane tabId={tabNames.Profile}>
            {(isProfileDetailsRoute || location.pathname === `/${userProfileEdit.team}/profile-details`) && (
              <Profile setDraftSavedModal={setDraftSavedModal} />
            )}
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
