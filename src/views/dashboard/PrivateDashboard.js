import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { profilePercentage, userData } from '../../redux/selectors/dashboardSelectors';
import { userTypes } from '../../utility/constants/Constant';
import { DashboardHeaderWrapper } from './overview/style';
import CompleteProfileModal from '../modals/CompleteProfileModal';
import TeamSection from './overview/TeamSection';
import TalentListing from './overview/TalentListing';
import TeamListing from './overview/TeamListing';

const PrivateDashboard = () => {
  const navigate = useNavigate();

  const userDetailsData = useSelector(userData);
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

  return (
    <div>
      {completeProfileModal && (
        <CompleteProfileModal modal={completeProfileModal} toggleModal={toggleCompleteProfileModal} />
      )}
      <BreadCrumbs data={[{ title: 'Dashboard' }]} />
      {userDetailsData?.user_type === userTypes.client && (
        <DashboardHeaderWrapper>
          <Button as="link" color="primary" onClick={onCreateProjectClick}>
            Create Project
          </Button>
        </DashboardHeaderWrapper>
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
          <section className="mb-2">
            <Header className="mb-1">Talents</Header>
            <TalentListing />
          </section>
          <section className="mb-2">
            <Header className="mb-1">Teams</Header>
            <TeamListing />
          </section>
        </Col>
        <Col lg="4" sm="12">
          <TeamSection />
          <Alerts />
          <Disputes />
          <Meetings />
        </Col>
      </Row>
    </div>
  );
};

export default PrivateDashboard;
