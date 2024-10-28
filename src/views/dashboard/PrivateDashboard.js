import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row, Spinner } from 'reactstrap';
import BreadCrumbs from '@components/breadcrumbs';
import EarningCard from './overview/Earning';
import RewardsCard from './overview/Reward';
import AvailableTime from './overview/AvailableTime';
import Alerts from './overview/Alerts';
import ProjectListing from './overview/ProjectListing';
import { Header } from '../styled';
import Disputes from './overview/Disputes';
// import Meetings from './overview/Meetings';
import { profilePercentage } from '../../redux/selectors/dashboardSelectors';
import { clubStatus, teamTypes, userTypes } from '../../utility/constants/Constant';
import { CreateTeamButtonWrapper, DashboardHeaderWrapper, InReviewButton } from './overview/style';
import CompleteProfileModal from '../modals/CompleteProfileModal';
import TeamSection from './overview/TeamSection';
import TalentListing from './overview/TalentListing';
import { appPermissionsSelector, selectTrumioIsFlextern, selectUserData } from '../../redux/selectors/authSelectors';
import InviteTalentToTeam from '../invite-talent-to-team';
import RemoveMemberModal from '../modals/RemoveMemberModal';
import ListingTeamMembersModal from '../modals/ListingTeamMembersModal';
import TeamListing from './overview/TeamListing';
import RaiseDisputeModal from '../disputes/overview/RaiseDisputeModal';
import OpenListing from './overview/OpenListing';
import RecommendedTeamsListing from './overview/RecommendedTeamsListing';
import { getCheckBidsAccepted } from '../../redux/actions/dashboardActions';
import { clearProjectData } from '../../redux/reducers/projectDetails';
import { clearModalData } from '../../redux/reducers/inviteTalent';
import { clearQuery, toggleIsNavbarSearchBarOpen } from '../../redux/reducers/gloabalSearch';
import { getItem, removeItem, setItem } from '../../utility/localStorageControl';
import { setActiveNavTab } from '../../redux/reducers/activeNavTab';
import CreateClubOrTeamModal from '../modals/CreateClubOrTeamModal';
import ClubSection from './overview/ClubSection';
import InviteClubMemberModal from '../modals/InviteClubMemberModal';
import getTeamId from '../../utility/commonUtils';
import InviteListing from './overview/InviteListing';
import PaymentListing from './overview/PaymentListing';
import AssessmentsOverview from './overview/AssessmentsOverview';
import { draftProjectsCheck } from '../../redux/actions/createProjectActions';
import { draftProjectsCheckLoading } from '../../redux/selectors/createProjectSelectors';
import SavedDraftsAvailableModal from '../modals/SavedDraftsAvailableModal';
import PermissionWrapper from '../../PermissionWrapper';
import { resetProjectCreationStore } from '@/flexternships/utils/core-utils';

const PrivateDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [listingTeamMembersModal, setListingTeamMembersModal] = useState(null);
  const [inviteTeamMemberModal, setInviteTeamMemberModal] = useState(null);
  const [inviteTalentToTeamModal, setInviteTalentToTeamModal] = useState(null);
  const [deleteModal, setDeletModal] = useState(false);
  const [isClubInvite, setIsClubInvite] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState();

  const [raisedDisputeModal, setRaisedDisputeModal] = useState(null);

  const [completeProfileModal, setCompleteProfileModal] = useState(null);
  const [completeProfileModalInfoText, setCompleteProfileModalInfoText] = useState(null);

  const [optionsModal, setOptionsModal] = useState(null);
  const [createTeamSelected, setCreateTeamSelected] = useState(true);
  const [inviteClubMembersModal, setInviteClubMembersModal] = useState(false);
  const [savedDraftsAvailableModal, setSavedDraftsAvailableModal] = useState(null);

  const query = useSelector((state) => state.search.query);
  const isDelegate = getItem('isDelegate');
  const isFlexternInvited = useSelector(selectTrumioIsFlextern);
  const toggleListingTeamMembersModal = () => {
    setListingTeamMembersModal(!listingTeamMembersModal);
  };

  const toggleInviteTeamMemberModal = () => {
    setInviteTeamMemberModal(!inviteTeamMemberModal);
    dispatch(clearModalData());
  };

  const toggleSavedDraftsAvailableModal = () => setSavedDraftsAvailableModal(!savedDraftsAvailableModal);

  const userDetailsData = useSelector(selectUserData);
  const appPermissions = useSelector(appPermissionsSelector);
  const profilePercentageData = useSelector(profilePercentage);
  const draftProjectsCheckIsLoading = useSelector(draftProjectsCheckLoading);

  const isClubAdmin = useSelector((state) => state.inviteTalent.isClubAdmin);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
    if (query) {
      dispatch(toggleIsNavbarSearchBarOpen());
      dispatch(clearQuery(''));
    }

    dispatch(getCheckBidsAccepted());
    dispatch(clearProjectData());
    setItem('baseRoute', 'dashboard');

    removeItem('selectedMarketplaceTab');
    removeItem('selectedProjectTab');
    removeItem('selectedMyTeamsTab');
  }, []);

  const toggleCompleteProfileModal = () => {
    setCompleteProfileModal(!completeProfileModal);
  };

  const onDraftProjectsCheckSuccess = (res) => {
    if (res?.has_draft_project) {
      setSavedDraftsAvailableModal(true);
    } else if (profilePercentageData?.values_missing?.includes('company_name') && !isDelegate) {
      setCompleteProfileModal(true);
    } else {
      handleCreateNewProject();
    }
  };

  const onCreateProjectClick = () => {
    dispatch(draftProjectsCheck(onDraftProjectsCheckSuccess));
  };

  const onClubInvite = () => {
    setIsClubInvite(true);
    setInviteTeamMemberModal(true);
    setInviteTalentToTeamModal(true);
  };

  const onTeamInvite = () => {
    setInviteTeamMemberModal(true);
    setInviteTalentToTeamModal(true);
  };

  const onCreateClub = () => {
    if (
      profilePercentageData?.values_missing?.includes('company_name') ||
      profilePercentageData?.values_missing?.includes('educational_institute') ||
      profilePercentageData?.values_missing?.includes('availability')
    ) {
      setCompleteProfileModalInfoText('create club');
      setCompleteProfileModal(true);
    } else {
      setCreateTeamSelected(false);
      setOptionsModal(true);
    }
  };

  const onCreateTeam = () => {
    if (
      profilePercentageData?.values_missing?.includes('company_name') ||
      profilePercentageData?.values_missing?.includes('educational_institute') ||
      profilePercentageData?.values_missing?.includes('availability')
    ) {
      setCompleteProfileModalInfoText('create team');
      setCompleteProfileModal(true);
    } else {
      setCreateTeamSelected(true);
      setOptionsModal(true);
    }
  };

  const handleRemoveMember = (data) => {
    setDeletModal(true);
    setDeleteModalData(data);
  };
  const handleJoinTeam = () => {
    if (
      profilePercentageData?.values_missing?.includes('company_name') ||
      profilePercentageData?.values_missing?.includes('educational_institute') ||
      profilePercentageData?.values_missing?.includes('availability')
    ) {
      setCompleteProfileModalInfoText('join team');
      setCompleteProfileModal(true);
    } else {
      navigate('/marketplace/teams');
      dispatch(setActiveNavTab('marketplace'));
    }
  };

  const handleRaiseDispute = () => {
    setRaisedDisputeModal(true);
  };

  const handleCreateNewProject = () => {
    resetProjectCreationStore();
    navigate('/create-project');
  }

  return (
    <div className={`trumio ${userDetailsData?.user_type === userTypes.talent ? 'flex flex-col gap-1.5' : ''}`}>
      {savedDraftsAvailableModal && (
        <SavedDraftsAvailableModal
          modal={savedDraftsAvailableModal}
          toggleModal={toggleSavedDraftsAvailableModal}
          modalText="You have project(s) in draft mode. Would you like to continue where you left off?"
          firstBtnText="Create New Project"
          secondBtnText="View Drafts"
          firstBtnAction={handleCreateNewProject}
          secondBtnAction={() =>
            navigate('/marketplace/my_listings', {
              state: {
                isDraftProjects: true,
              },
            })
          }
        />
      )}
      {completeProfileModal && (
        <CompleteProfileModal
          modal={completeProfileModal}
          toggleModal={toggleCompleteProfileModal}
          modalInfoText={completeProfileModalInfoText}
        />
      )}
      {listingTeamMembersModal && (
        <ListingTeamMembersModal
          modal={listingTeamMembersModal}
          toggleModal={toggleListingTeamMembersModal}
          toggleInviteTeamMemberModal={toggleInviteTeamMemberModal}
          setInviteTalentToTeamModal={setInviteTalentToTeamModal}
          onRemove={handleRemoveMember}
          isAdmin={isClubAdmin}
          onClubInvite={onClubInvite}
        />
      )}
      {deleteModal && (
        <RemoveMemberModal modal={deleteModal} data={deleteModalData} toggleModal={() => setDeletModal(!deleteModal)} />
      )}
      {raisedDisputeModal && (
        <RaiseDisputeModal modal={raisedDisputeModal} toggleModal={() => setRaisedDisputeModal(!raisedDisputeModal)} />
      )}
      {optionsModal && (
        <CreateClubOrTeamModal
          modal={optionsModal}
          toggleModal={() => setOptionsModal(!optionsModal)}
          defaultSelectedGroup={createTeamSelected ? teamTypes.team : teamTypes.club}
        />
      )}
      {inviteClubMembersModal && (
        <InviteClubMemberModal
          modal={inviteClubMembersModal}
          toggleModal={() => setInviteClubMembersModal(!inviteClubMembersModal)}
        />
      )}
      <span className="mb-2">
        <BreadCrumbs data={[{ title: 'Dashboard' }]} />
      </span>
      {userDetailsData?.user_type === userTypes.client && (
        <DashboardHeaderWrapper>
          <Button color="primary" onClick={onCreateProjectClick} disabled={draftProjectsCheckIsLoading}>
            {draftProjectsCheckIsLoading ? <Spinner size="sm" /> : 'Create Project'}
          </Button>
        </DashboardHeaderWrapper>
      )}
      {userDetailsData?.team_type === userTypes.team && (
        <DashboardHeaderWrapper>
          <Button as="link" color="primary" onClick={onTeamInvite}>
            Invite Talent
          </Button>
        </DashboardHeaderWrapper>
      )}
      {userDetailsData?.team_type === userTypes.club && (
        <span>
          {userDetailsData?.club_status === clubStatus.ACCEPTED && isClubAdmin && (
            <DashboardHeaderWrapper>
              <Button as="link" color="primary" onClick={onClubInvite}>
                Invite Members
              </Button>
              {userDetailsData?.club_status === clubStatus.IN_REVIEW && <InReviewButton>In review</InReviewButton>}
            </DashboardHeaderWrapper>
          )}
        </span>
      )}

      {inviteTalentToTeamModal && isClubInvite && (
        <InviteTalentToTeam
          isClubInvitation
          inviteTeamMemberModal={inviteTeamMemberModal}
          toggleInviteTeamMemberModal={toggleInviteTeamMemberModal}
          setInviteTalentToTeamModal={setInviteTalentToTeamModal}
        />
      )}

      {inviteTalentToTeamModal && !isClubInvite && (
        <InviteTalentToTeam
          inviteTeamMemberModal={inviteTeamMemberModal}
          toggleInviteTeamMemberModal={toggleInviteTeamMemberModal}
          setInviteTalentToTeamModal={setInviteTalentToTeamModal}
        />
      )}

      {userDetailsData?.user_type === userTypes.talent && (
        <CreateTeamButtonWrapper>
          <PermissionWrapper permissions={appPermissions} permissionName={['DASHBOARD.CREATES.CREATE_CLUB']}>
            <span
              className="text-decoration-underline font-medium-2 link-primary cursor-pointer"
              onClick={onCreateClub}
            >
              Create Club
            </span>
          </PermissionWrapper>
          <PermissionWrapper permissions={appPermissions} permissionName={['DASHBOARD.CREATES.CREATE_TEAM']}>
            <span
              className="text-decoration-underline font-medium-2 link-primary cursor-pointer"
              onClick={onCreateTeam}
            >
              Create Team
            </span>
          </PermissionWrapper>
          <PermissionWrapper permissions={appPermissions} permissionName={['DASHBOARD.CREATES.JOIN_TEAM']}>
            <Button as="link" color="primary" onClick={handleJoinTeam}>
              Join Team
            </Button>
          </PermissionWrapper>
        </CreateTeamButtonWrapper>
      )}
      <Row>
        <Col lg="8" sm="12">
          <Row>
            <PermissionWrapper permissions={appPermissions} permissionName={['DASHBOARD.PAYMENT_METRICS']}>
              <Col lg="6" sm="12">
                <EarningCard />
              </Col>
            </PermissionWrapper>
            <PermissionWrapper permissions={appPermissions} permissionName={['DASHBOARD.REWARDS']}>
              <Col lg="6" sm="12">
                <RewardsCard />
              </Col>
            </PermissionWrapper>
          </Row>
          <PermissionWrapper
            permissions={appPermissions}
            permissionName={[
              'DASHBOARD.PROJECTS.ACTIVE_PROJECTS',
              'DASHBOARD.PROJECTS.UPCOMING_PROJECTS',
              'DASHBOARD.PROJECTS.RECOMMENDED_PROJECTS',
            ]}
          >
            <section className="mb-2 ">
              <Header className="mb-1">Projects</Header>
              <ProjectListing />
            </section>
          </PermissionWrapper>

          <PermissionWrapper permissions={appPermissions} permissionName={['DASHBOARD.PAYMENTS.UPCOMING_PAYMENTS']}>
            <section className="mb-2">
              <Header className="mb-1">Payments</Header>
              <PaymentListing />
            </section>
          </PermissionWrapper>
          {userDetailsData?.user_type === userTypes.client && (
            <section className="mb-2">
              <Header className="mb-1">Open Listings</Header>
              <OpenListing />
            </section>
          )}
          {userDetailsData?.user_type === userTypes.client && (
            <PermissionWrapper permissions={appPermissions} permissionName={['DASHBOARD.TEAMS.RECOMMENDED_TEAMS']}>
              <section className="mb-2">
                <Header className="mb-1">Teams</Header>
                <RecommendedTeamsListing />
              </section>
            </PermissionWrapper>
          )}
          {userDetailsData?.team_type === userTypes.team && getTeamId('team_id') && (
            <section className="mb-2">
              <Header className="mb-1">Talent</Header>
              <TalentListing />
            </section>
          )}
          {userDetailsData?.team_type === userTypes.club && isClubAdmin && getTeamId('team_id') && (
            <section className="mb-2">
              <Header className="mb-1">Members</Header>
              <TalentListing />
            </section>
          )}
          {userDetailsData?.user_type === userTypes.talent && (
            <PermissionWrapper permissions={appPermissions} permissionName={['DASHBOARD.TEAMS.RECOMMENDED_TEAMS']}>
              <section className="mb-2">
                <Header className="mb-1">Teams</Header>
                <TeamListing />
              </section>
            </PermissionWrapper>
          )}
          {userDetailsData?.user_type === userTypes.talent && (
            <section className="mb-2">
              <Header className="mb-1">Invites</Header>
              <InviteListing />
            </section>
          )}
        </Col>

        <Col lg="4" sm="12">
          {userDetailsData?.team_type !== userTypes.club && (
            <div>
              {userDetailsData?.user_type === 'CLIENT' ? (
                <PermissionWrapper permissions={appPermissions} permissionName={['DASHBOARD.AVAILABILITY']}>
                  <AvailableTime />
                </PermissionWrapper>
              ) : (
                !isFlexternInvited && (
                  <PermissionWrapper permissions={appPermissions} permissionName={['DASHBOARD.ASSESSMENTs']}>
                    <AssessmentsOverview />
                  </PermissionWrapper>
                )
              )}
            </div>
          )}
          {userDetailsData?.team_type === userTypes.club && getTeamId('team_id') && (
            <ClubSection
              modal={listingTeamMembersModal}
              toggleModal={toggleListingTeamMembersModal}
              // toggleInviteTeamMemberModal={toggleInviteTeamMemberModal}
            />
          )}
          {userDetailsData?.team_type === userTypes.team && getTeamId('team_id') && (
            <TeamSection
              modal={listingTeamMembersModal}
              toggleModal={toggleListingTeamMembersModal}
              // toggleInviteTeamMemberModal={toggleInviteTeamMemberModal}
            />
          )}
          <Alerts />
          <PermissionWrapper permissions={appPermissions} permissionName={['DASHBOARD.DISPUTES']}>
            <Disputes handleRaiseDispute={handleRaiseDispute} />
          </PermissionWrapper>
        </Col>
      </Row>
    </div>
  );
};

export default PrivateDashboard;
