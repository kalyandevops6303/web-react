import React from 'react';
import { Col, Row } from 'reactstrap';
import EarningCard from '../ui-elements/dashboard/Earning';
import RewardsCard from '../ui-elements/dashboard/Reward';
import AvailableTime from '../ui-elements/dashboard/AvailableTime';
import { Header } from '../ui-elements/styled';
import Alerts from '../ui-elements/dashboard/Alerts';
import ProjectListing from '../ui-elements/dashboard/ProjectListing';

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
