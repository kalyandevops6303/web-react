import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import BreadCrumbs from '@components/breadcrumbs';
import CustomStep from '@components/custom-stepper';
import { Col, Progress, Row } from 'reactstrap';
import LeftSidebarProjectDetails from './overview/LeftSidebarProjectDetails';
import { createBidSteps } from '../../utility/constants/Constant';
import { ProgressBarWrapper } from './style';
import TeamView from './overview/TeamView';
import MilestoneView from './overview/MilestoneView';

const index = () => {
  const location = useLocation();

  const [currentStep, setCurrentStep] = useState(location?.pathname?.split('/')?.[4]);

  const changeStep = (step) => {
    setCurrentStep(step);
  };

  return (
    <>
      <BreadCrumbs data={[{ title: 'Marketplace' }, { title: 'Project name' }]} />
      <Row>
        <Col lg="3">
          <LeftSidebarProjectDetails />
        </Col>
        <Col lg="9">
          <Row className="w-75">
            <CustomStep steps={createBidSteps} currentStep={currentStep} onChangeStep={changeStep} />
            <ProgressBarWrapper>
              <Progress value={30} className="p-0">
                {30}%
              </Progress>
            </ProgressBarWrapper>
          </Row>
          <Routes>
            <Route path="team" element={<TeamView />} />
            <Route path="milestone" element={<MilestoneView />} />
          </Routes>
        </Col>
      </Row>
    </>
  );
};

export default index;
