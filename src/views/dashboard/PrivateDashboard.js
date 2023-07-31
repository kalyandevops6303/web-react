import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
import { userData } from '../../redux/selectors/dashboardSelectors';
import { userTypes } from '../../utility/constants/Constant';
import ListingTeamMembersModal from '../modals/ListingTeamMembersModal';
import InviteTeamMemberModal from '../modals/InviteTeamMemberModal';

const PrivateDashboard = () => {
  const userDetailsData = useSelector(userData);

  const [listingTeamMembersModal, setListingTeamMembersModal] = useState(null);
  const [inviteTeamMemberModal, setInviteTeamMemberModal] = useState(null);

  const toggleListingTeamMembersModal = () => {
    setListingTeamMembersModal(!listingTeamMembersModal);
  };

  const toggleInviteTeamMemberModal = () => {
    setInviteTeamMemberModal(!inviteTeamMemberModal);
  };
  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
    setListingTeamMembersModal(true);
  }, []);
  return (
    <div>
      {listingTeamMembersModal && (
        <ListingTeamMembersModal
          modal={listingTeamMembersModal}
          toggleModal={toggleListingTeamMembersModal}
          setInviteTeamMemberModal={setInviteTeamMemberModal}
        />
      )}
      {inviteTeamMemberModal && (
        <InviteTeamMemberModal modal={inviteTeamMemberModal} toggleModal={toggleInviteTeamMemberModal} />
      )}
      <div className="d-flex justify-content-between">
        <BreadCrumbs data={[{ title: 'Dashboard' }]} />
        {userDetailsData?.user_type === userTypes.client && (
          <Link to="/create-project">
            <Button as="link" color="primary">
              Create Project
            </Button>
          </Link>
        )}
      </div>
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
          <Header>Projects</Header>
          <ProjectListing />
        </Col>
        <Col lg="4" sm="12">
          <Alerts />
          <Disputes />
          <Meetings />
        </Col>
      </Row>
    </div>
  );
};

export default PrivateDashboard;
