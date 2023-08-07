import React, { useState } from 'react';
import { useParams } from 'react-router';
import BreadCrumbs from '@components/breadcrumbs';
import CustomStep from '@components/custom-stepper';
import { Col, Progress, Row } from 'reactstrap';
import LeftSidebarProjectDetails from './overview/LeftSidebarProjectDetails';
import { createBidSteps } from '../../utility/constants/Constant';
import { ProgressBarWrapper } from './style';

const index = () => {
  const params = useParams();

  const [currentStep, setCurrentStep] = useState(params?.step);

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
        </Col>
      </Row>
    </>
  );
};

export default index;
