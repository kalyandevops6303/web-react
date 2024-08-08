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
import Meetings from './overview/Meetings';
import { profilePercentage } from '../../redux/selectors/dashboardSelectors';
import { clubStatus, userTypes } from '../../utility/constants/Constant';
import { CreateTeamButtonWrapper, DashboardHeaderWrapper, InReviewButton } from './overview/style';
import CompleteProfileModal from '../modals/CompleteProfileModal';
import TeamSection from './overview/TeamSection';
import TalentListing from './overview/TalentListing';
import { selectUserData } from '../../redux/selectors/authSelectors';
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
  const [inviteClubMembersModal, setInviteClubMembersModal] = useState(false);
  const [savedDraftsAvailableModal, setSavedDraftsAvailableModal] = useState(null);

  const query = useSelector((state) => state.search.query);
  const isDelegate = getItem('isDelegate');

  const toggleListingTeamMembersModal = () => {
    setListingTeamMembersModal(!listingTeamMembersModal);
  };

  const toggleInviteTeamMemberModal = () => {
    setInviteTeamMemberModal(!inviteTeamMemberModal);
    dispatch(clearModalData());
  };

  const toggleSavedDraftsAvailableModal = () => setSavedDraftsAvailableModal(!savedDraftsAvailableModal);

  const userDetailsData = useSelector(selectUserData);
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
      navigate('/create-project');
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

  return (
    <div>
      {/* {isDelegate && isDelegateModeModalVisible && (
        <DelegateModeModal modal={isDelegateModeModalVisible} toggleModal={toggleDelegateMode} />
      )} */}
      {savedDraftsAvailableModal && (
        <SavedDraftsAvailableModal
          modal={savedDraftsAvailableModal}
          toggleModal={toggleSavedDraftsAvailableModal}
          modalText="You have project(s) in draft mode. Would you like to continue where you left off?"
          firstBtnText="Create New Project"
          secondBtnText="View Drafts"
          firstBtnAction={() => navigate('/create-project')}
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
        <CreateClubOrTeamModal modal={optionsModal} toggleModal={() => setOptionsModal(!optionsModal)} />
      )}
      {inviteClubMembersModal && (
        <InviteClubMemberModal
          modal={inviteClubMembersModal}
          toggleModal={() => setInviteClubMembersModal(!inviteClubMembersModal)}
        />
      )}
      <BreadCrumbs data={[{ title: 'Dashboard' }]} />
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
          <span className="text-decoration-underline font-medium-2 link-primary cursor-pointer" onClick={onCreateClub}>
            Create Club
          </span>
          <span className="text-decoration-underline font-medium-2 link-primary cursor-pointer" onClick={onCreateTeam}>
            Create Team
          </span>
          <Button as="link" color="primary" onClick={handleJoinTeam}>
            Join Team
          </Button>
        </CreateTeamButtonWrapper>
      )}
      <Row>
        <Col lg="8" sm="12">
          <Row>
            <Col lg="6" sm="12">
              <EarningCard />
            </Col>
            <Col lg="6" sm="12">
              <RewardsCard />
            </Col>
          </Row>
          <section className="mb-2">
            <Header className="mb-1">Projects</Header>
            <ProjectListing />
          </section>
          {userDetailsData?.team_type === userTypes.team ? null : (
            <section className="mb-2">
              <Header className="mb-1">Payments</Header>
              <PaymentListing />
            </section>
          )}
          {userDetailsData?.user_type === userTypes.client && (
            <section className="mb-2">
              <Header className="mb-1">Open Listings</Header>
              <OpenListing />
            </section>
          )}
          {userDetailsData?.user_type === userTypes.client && (
            <section className="mb-2">
              <Header className="mb-1">Teams</Header>
              <RecommendedTeamsListing />
            </section>
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
            <section className="mb-2">
              <Header className="mb-1">Teams</Header>
              <TeamListing />
            </section>
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
            <div>{userDetailsData?.user_type === 'CLIENT' ? <AvailableTime /> : <AssessmentsOverview />}</div>
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
          <Disputes handleRaiseDispute={handleRaiseDispute} />
          <Meetings />
        </Col>
      </Row>
    </div>
  );
};

export default PrivateDashboard;
