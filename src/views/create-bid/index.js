import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import BreadCrumbs from '@components/breadcrumbs';
import CustomStep from '@components/custom-stepper';
import { Col, Progress, Row } from 'reactstrap';
import LeftSidebarProjectDetails from './overview/LeftSidebarProjectDetails';
import { createBidSteps } from '../../utility/constants/Constant';
import { ProgressBarWrapper } from './style';
import TeamView from './overview/TeamView';
import MilestoneView from './overview/MilestoneView';
import Preview from './overview/Preview';

const CreateBid = () => {
  const location = useLocation();

  const [currentStep, setCurrentStep] = useState(location?.pathname?.split('/')?.[5]);
  const [progressPercent, setProgressPercent] = useState(null);

  const changeStep = (step) => {
    setCurrentStep(step);
  };

  useEffect(() => {
    let percent = 0;
    if (currentStep === 'team') {
      percent = 30;
    } else if (currentStep === 'milestone') {
      percent = 60;
    } else if (currentStep === 'preview') {
      percent = 100;
    }
    setProgressPercent(percent);
  }, [currentStep]);

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
              <Progress value={progressPercent} className="p-0">
                {progressPercent}%
              </Progress>
            </ProgressBarWrapper>
          </Row>
          <Routes>
            <Route path="team" element={<TeamView />} />
            <Route path="milestone" element={<MilestoneView />} />
            <Route path="preview" element={<Preview />} />
          </Routes>
        </Col>
      </Row>
    </>
  );
};

export default CreateBid;
