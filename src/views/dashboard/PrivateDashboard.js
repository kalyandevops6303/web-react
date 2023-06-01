import React from 'react';
import { Col, Row } from 'reactstrap';
import EarningCard from '../ui-elements/dashboard/Earning';
import RewardsCard from '../ui-elements/dashboard/Reward';
import AvailableTime from '../ui-elements/dashboard/AvailableTime';
import Projects from '../ui-elements/dashboard/Projects';
import { Header } from '../ui-elements/styled';

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
        <Projects />
      </Col>
      <Col lg="4" sm="12">
        Alerts
      </Col>
    </Row>
  </div>
);

export default PrivateDashboard;
