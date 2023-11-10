import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row } from 'reactstrap';
import BreadCrumbs from '@components/breadcrumbs';
import EarningCard from './overview/Earning';
import RewardsCard from './overview/Reward';
import AvailableTime from './overview/AvailableTime';
import Alerts from './overview/Alerts';
import ProjectListing from './overview/ProjectListing';
import { Header } from '../styled';
import Disputes from './overview/Disputes';
import Meetings from './overview/Meetings';
import { checkBidsAccepted, profilePercentage } from '../../redux/selectors/dashboardSelectors';
import { userTypes } from '../../utility/constants/Constant';
import { CreateTeamButtonWrapper, DashboardHeaderWrapper } from './overview/style';
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
import { getCheckBidsAccepted } from '../../redux/actions/dashboardActions';
import { clearProjectData } from '../../redux/reducers/projectDetails';
import { clearModalData } from '../../redux/reducers/inviteTalent';
import { clearQuery, toggleIsNavbarSearchBarOpen } from '../../redux/reducers/gloabalSearch';
import { setItem } from '../../utility/localStorageControl';
import { setActiveNavTab } from '../../redux/reducers/activeNavTab';

const PrivateDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [listingTeamMembersModal, setListingTeamMembersModal] = useState(null);
  const [inviteTeamMemberModal, setInviteTeamMemberModal] = useState(null);
  const [inviteTalentToTeamModal, setInviteTalentToTeamModal] = useState(null);
  const [deleteModal, setDeletModal] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState();

  const [raisedDisputeModal, setRaisedDisputeModal] = useState(null);

  const [completeProfileModal, setCompleteProfileModal] = useState(null);
  const [completeProfileModalInfoText, setCompleteProfileModalInfoText] = useState(null);
  const query = useSelector((state) => state.search.query);

  const toggleListingTeamMembersModal = () => {
    setListingTeamMembersModal(!listingTeamMembersModal);
  };

  const toggleInviteTeamMemberModal = () => {
    setInviteTeamMemberModal(!inviteTeamMemberModal);
    dispatch(clearModalData());
  };

  const userDetailsData = useSelector(selectUserData);
  const profilePercentageData = useSelector(profilePercentage);
  const checkBidsAcceptedData = useSelector(checkBidsAccepted);

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
  }, []);

  const toggleCompleteProfileModal = () => {
    setCompleteProfileModal(!completeProfileModal);
  };

  const onCreateProjectClick = () => {
    if (
      profilePercentageData?.values_missing?.includes('company_name') ||
      profilePercentageData?.values_missing?.includes('educational_institute') ||
      profilePercentageData?.values_missing?.includes('availability') ||
      profilePercentageData?.values_missing?.includes('payment_account')
    ) {
      setCompleteProfileModalInfoText('create project');
      setCompleteProfileModal(true);
    } else {
      navigate('/create-project');
    }
  };

  const onTeamInvite = () => {
    setInviteTeamMemberModal(true);
    setInviteTalentToTeamModal(true);
  };

  const onCreateTeam = () => {
    if (
      profilePercentageData?.values_missing?.includes('company_name') ||
      profilePercentageData?.values_missing?.includes('educational_institute') ||
      profilePercentageData?.values_missing?.includes('availability') ||
      profilePercentageData?.values_missing?.includes('payment_account')
    ) {
      setCompleteProfileModalInfoText('create team');
      setCompleteProfileModal(true);
    } else {
      navigate('/create-team/profile-details');
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
      profilePercentageData?.values_missing?.includes('availability') ||
      profilePercentageData?.values_missing?.includes('payment_account')
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
        />
      )}
      {deleteModal && (
        <RemoveMemberModal modal={deleteModal} data={deleteModalData} toggleModal={() => setDeletModal(!deleteModal)} />
      )}

      {raisedDisputeModal && (
        <RaiseDisputeModal modal={raisedDisputeModal} toggleModal={() => setRaisedDisputeModal(!raisedDisputeModal)} />
      )}

      <BreadCrumbs data={[{ title: 'Dashboard' }]} />
      {userDetailsData?.user_type === userTypes.client && (
        <DashboardHeaderWrapper>
          <Button as="link" color="primary" onClick={onCreateProjectClick}>
            Create Project
          </Button>
        </DashboardHeaderWrapper>
      )}
      {userDetailsData?.user_type === userTypes.team && (
        <DashboardHeaderWrapper>
          <Button as="link" color="primary" onClick={onTeamInvite}>
            Invite Talent
          </Button>
        </DashboardHeaderWrapper>
      )}
      {inviteTalentToTeamModal && (
        <InviteTalentToTeam
          inviteTeamMemberModal={inviteTeamMemberModal}
          toggleInviteTeamMemberModal={toggleInviteTeamMemberModal}
          setInviteTalentToTeamModal={setInviteTalentToTeamModal}
        />
      )}
      {userDetailsData?.user_type === userTypes.talent && (
        <CreateTeamButtonWrapper>
          <span className="text-decoration-underline font-medium-2 link-primary cursor-pointer" onClick={onCreateTeam}>
            Create Team
          </span>
          <Button as="link" color="primary" onClick={handleJoinTeam}>
            Join Team
          </Button>
        </CreateTeamButtonWrapper>
      )}

      <Row>
        <Col lg="4" sm="12">
          <EarningCard />
        </Col>
        <Col lg="4" sm="12">
          <RewardsCard />
        </Col>
        <Col lg="4" sm="12">
          <AvailableTime />
        </Col>
      </Row>
      <Row>
        <Col lg="8" sm="12">
          <section className="mb-2">
            <Header className="mb-1">Projects</Header>
            <ProjectListing />
          </section>
          {userDetailsData?.user_type === userTypes.client && (
            <section className="mb-2">
              <Header className="mb-1">Open Listings</Header>
              <OpenListing />
            </section>
          )}
          {userDetailsData?.user_type === userTypes.team && (
            <section className="mb-2">
              <Header className="mb-1">Talent</Header>
              <TalentListing />
            </section>
          )}
          {userDetailsData?.user_type === userTypes.talent && (
            <section className="mb-2">
              <Header className="mb-1">Teams</Header>
              <TeamListing />
            </section>
          )}
        </Col>
        <Col lg="4" sm="12">
          {userDetailsData?.user_type === userTypes.team && (
            <TeamSection
              modal={listingTeamMembersModal}
              toggleModal={toggleListingTeamMembersModal}
              // toggleInviteTeamMemberModal={toggleInviteTeamMemberModal}
            />
          )}
          <Alerts />
          {checkBidsAcceptedData?.data?.length > 0 && <Disputes handleRaiseDispute={handleRaiseDispute} />}
          <Meetings />
        </Col>
      </Row>
    </div>
  );
};

export default PrivateDashboard;
