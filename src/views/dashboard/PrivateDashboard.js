import React from 'react';
import { Col, Row } from 'reactstrap';
import EarningCard from './overview/Earning';
import RewardsCard from './overview/Reward';
import AvailableTime from './overview/AvailableTime';
import Alerts from './overview/Alerts';
import ProjectListing from './overview/ProjectListing';
import { Header } from '../styled';

const PrivateDashboard = () => (
  <div>
    <Header isTopCards>Dashboard</Header>
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
      </Col>
    </Row>
  </div>
);

export default PrivateDashboard;
