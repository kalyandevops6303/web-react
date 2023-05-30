import React from 'react';
import styled from 'styled-components';
import { Col, Row } from 'reactstrap';
import EarningCard from '../ui-elements/dashboard/Earning';
import RewardsCard from '../ui-elements/dashboard/Reward';
import AvailableTime from '../ui-elements/dashboard/AvailableTime';

const Header = styled.div`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 29px;
  color: #5e5873;
  margin-bottom: 1.5rem;
`;
const PrivateDashboard = () => (
  <div>
    <Header>Dashboard</Header>
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
  </div>
);

export default PrivateDashboard;
