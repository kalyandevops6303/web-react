import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import BreadCrumbs from '@components/breadcrumbs';
import { Col, Progress, Row } from 'reactstrap';
import LeftSidebarProjectDetails from './overview/LeftSidebarProjectDetails';
import { createBidSteps, userTypes } from '../../utility/constants/Constant';
import { ProgressBarWrapper } from './style';
import VariableSimpleMilestoneView from './overview/VariableSimpleMilestoneView';
import Preview from './overview/Preview';
import FormStepper from './overview/FormStepper';
import { selectUserData } from '../../redux/selectors/authSelectors';
import FixedSimpleMilestoneView from './overview/FixedSimpleMilestoneView';
import SimpleTeamView from './overview/SimpleTeamView';
import AdvanceTeamView from './overview/AdvanceTeamView';

const CreateBid = () => {
  const location = useLocation();
  const params = useParams();

  const [currentStep, setCurrentStep] = useState(location?.pathname?.split('/')?.[5]);
  const [progressPercent, setProgressPercent] = useState(null);

  const selectUserDetailsData = useSelector(selectUserData);

  const changeStep = (step) => {
    setCurrentStep(step);
  };

  useEffect(() => {
    let percent = 0;
    if (currentStep === 'team') {
      percent = 30;
    } else if (selectUserDetailsData?.user_type === userTypes.team && currentStep === 'milestone') {
      percent = 60;
    } else if (selectUserDetailsData?.user_type === userTypes.talent && currentStep === 'milestone') {
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
                selectUserDetailsData?.user_type === userTypes.team
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
            {(params.bidType === 'variable-simple' || params.bidType === 'fixed-simple') &&
              selectUserDetailsData?.user_type === userTypes.team && <Route path="team" element={<SimpleTeamView />} />}
            {params.bidType === 'variable-advanced' && selectUserDetailsData?.user_type === userTypes.team && (
              <Route path="team" element={<AdvanceTeamView />} />
            )}
            {params.bidType === 'variable-simple' && (
              <Route path="milestone" element={<VariableSimpleMilestoneView />} />
            )}
            {params.bidType === 'fixed-simple' && <Route path="milestone" element={<FixedSimpleMilestoneView />} />}
            <Route path="preview" element={<Preview />} />
          </Routes>
        </Col>
      </Row>
    </>
  );
};

export default CreateBid;
