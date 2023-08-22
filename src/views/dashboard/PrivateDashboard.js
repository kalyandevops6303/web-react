import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
import { profilePercentage } from '../../redux/selectors/dashboardSelectors';
import { userTypes } from '../../utility/constants/Constant';
import ListingTeamMembersModal from '../modals/ListingTeamMembersModal';
import { CreateTeamButtonWrapper, DashboardHeaderWrapper } from './overview/style';
import CompleteProfileModal from '../modals/CompleteProfileModal';
import TeamSection from './overview/TeamSection';
import TalentListing from './overview/TalentListing';
import TeamListing from './overview/TeamListing';
import { selectUserData } from '../../redux/selectors/authSelectors';
import { getItem } from '../../utility/localStorageControl';
import InviteTalentToTeam from '../invite-talent-to-team';

const PrivateDashboard = () => {
  const navigate = useNavigate();

  const [listingTeamMembersModal, setListingTeamMembersModal] = useState(null);
  const [inviteTeamMemberModal, setInviteTeamMemberModal] = useState(null);
  const [inviteTalentToTeamModal, setInviteTalentToTeamModal] = useState(null);

  const toggleListingTeamMembersModal = () => {
    setListingTeamMembersModal(!listingTeamMembersModal);
  };

  const toggleInviteTeamMemberModal = () => {
    setInviteTeamMemberModal(!inviteTeamMemberModal);
  };

  const userDetailsData = useSelector(selectUserData);
  const profilePercentageData = useSelector(profilePercentage);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
  }, []);

  const [completeProfileModal, setCompleteProfileModal] = useState(null);

  const toggleCompleteProfileModal = () => {
    setCompleteProfileModal(!completeProfileModal);
  };

  const onCreateProjectClick = () => {
    if (
      profilePercentageData?.values_missing?.includes('company_name') ||
      profilePercentageData?.values_missing?.includes('educational_institute') ||
      profilePercentageData?.values_missing?.includes('availability')
    ) {
      setCompleteProfileModal(true);
    } else {
      navigate('/create-project');
    }
  };

  const onTeamInvite = () => {
    setInviteTeamMemberModal(true);
    setInviteTalentToTeamModal(true);
  };

  const inviteToken = getItem('inviteToken');
  const isInviteRead = getItem('isInviteRead');

  useEffect(() => {
    if (inviteToken && !isInviteRead) {
      navigate('/team-invitation/64e4eb63c4c0a33056afe4c4');
    }
  }, []);

  return (
    <div>
      {completeProfileModal && (
        <CompleteProfileModal modal={completeProfileModal} toggleModal={toggleCompleteProfileModal} />
      )}
      {listingTeamMembersModal && (
        <ListingTeamMembersModal
          modal={listingTeamMembersModal}
          toggleModal={toggleListingTeamMembersModal}
          toggleInviteTeamMemberModal={toggleInviteTeamMemberModal}
          setInviteTalentToTeamModal={setInviteTalentToTeamModal}
        />
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
          <Link to="/create-team/profile-details">
            <span className="text-decoration-underline font-medium-2">Create Team</span>
          </Link>
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
          {userDetailsData?.user_type === userTypes.team && (
            <section className="mb-2">
              <Header className="mb-1">Talents</Header>
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
          <Disputes />
          <Meetings />
        </Col>
      </Row>
    </div>
  );
};

export default PrivateDashboard;
