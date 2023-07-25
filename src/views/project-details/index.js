import React, { useState } from 'react';
import BreadCrumbs from '@components/breadcrumbs';
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import { Route, Routes, useLocation } from 'react-router-dom';
import LeftSidebarProjectDetails from './overview/LeftSidebarProjectDetails';
import CustomStep from '../../@core/components/custom-stepper';
import { steps } from './overview/constants';
import { BidWrapper } from './style';
import BidTimeline from './overview/BidTimeline';

const BidView = () => (
  <BidWrapper>
    <Card>
      <CardTitle className="main-card-title">Bid Stage</CardTitle>
      <CardBody className="main-card-body">
        <BidTimeline />
      </CardBody>
    </Card>
  </BidWrapper>
);
const TeamView = () => (
  <Card>
    <CardTitle className="main-card-title">Team section</CardTitle>
    <CardBody className="main-card-body">Hello </CardBody>
  </Card>
);
const ProjectDetails = () => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(location?.pathname?.split('/')?.[3]);

  const changeStep = (step) => {
    setCurrentStep(step);
  };
  return (
    <>
      <BreadCrumbs data={[{ title: 'Project name' }]} />
      <Row>
        <Col lg="3">
          <LeftSidebarProjectDetails />
        </Col>
        <Col lg="9">
          <CustomStep steps={steps} currentStep={currentStep} onChangeStep={changeStep} />
          <Routes>
            <Route path="bid" element={<BidView />} />
            <Route path="team" element={<TeamView />} />
          </Routes>
        </Col>
      </Row>
    </>
  );
};

export default ProjectDetails;
