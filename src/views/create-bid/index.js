import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import BreadCrumbs from '@components/breadcrumbs';
import { Col, Progress, Row } from 'reactstrap';
import LeftSidebarProjectDetails from './overview/LeftSidebarProjectDetails';
import { createBidSteps, userTypes } from '../../utility/constants/Constant';
import { ProgressBarWrapper } from './style';
import TeamView from './overview/TeamView';
import MilestoneView from './overview/MilestoneView';
import Preview from './overview/Preview';
import FormStepper from './overview/FormStepper';

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
    } else if (location?.state?.entity === userTypes.team && currentStep === 'milestone') {
      percent = 60;
    } else if (location?.state?.entity === userTypes.talent && currentStep === 'milestone') {
      percent = 50;
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
            <FormStepper
              steps={
                location?.state?.entity === userTypes.team
                  ? createBidSteps
                  : createBidSteps.filter((step) => step.title !== 'Team')
              }
              currentStep={currentStep}
              onChangeStep={changeStep}
            />
            <ProgressBarWrapper>
              <Progress value={progressPercent} className="p-0">
                {progressPercent}%
              </Progress>
            </ProgressBarWrapper>
          </Row>
          <Routes>
            {location?.state?.entity === userTypes.team && <Route path="team" element={<TeamView />} />}
            <Route path="milestone" element={<MilestoneView />} />
            <Route path="preview" element={<Preview />} />
          </Routes>
        </Col>
      </Row>
    </>
  );
};

export default CreateBid;
