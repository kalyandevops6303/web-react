/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BreadCrumbs from '@components/breadcrumbs';
import { Col, Row } from 'reactstrap';
import { Route, Routes, useLocation } from 'react-router-dom';
import LeftSidebarProjectDetails from './overview/LeftSidebarProjectDetails';
import CustomStep from '../../@core/components/custom-stepper';
import { steps } from './overview/constants';
import BidView from './overview/BidView';
import TeamView from './overview/TeamView';
import { projectDetails } from '../../redux/selectors/projectDetailsSelectors';

const ProjectDetails = () => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(location?.pathname?.split('/')?.[3]);

  const changeStep = (step) => {
    setCurrentStep(step);
  };
  const projectDetailsData = useSelector(projectDetails);

  useEffect(() => {
    window?.scrollTo(0, 0);
  }, []);
  return (
    <>
      <BreadCrumbs
        data={[
          { title: 'Marketplace', link: '/marketplace/all_listings' },
          { title: projectDetailsData?.details?.name },
        ]}
      />
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
