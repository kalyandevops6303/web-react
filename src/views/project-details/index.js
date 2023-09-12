/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BreadCrumbs from '@components/breadcrumbs';
import { Col, Row } from 'reactstrap';
import { Route, Routes, useLocation } from 'react-router-dom';

import LeftSidebarProjectDetails from './overview/LeftSidebarProjectDetails';
import CustomStep from '../../@core/components/custom-stepper';
import { InviteView, steps } from './overview/constants';
import BidView from './overview/BidView';
import TeamView from './overview/TeamView';
import { projectDetails } from '../../redux/selectors/projectDetailsSelectors';
import InviteMemberCard from './overview/InviteMemberCard';
import InvitationView from './overview/InvitationView';
import Milestone from './milestones/Milestone';

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

  const isInviteView = location?.pathname?.includes('project-invitation');

  return (
    <>
      <BreadCrumbs
        data={
          isInviteView
            ? [{ title: projectDetailsData?.details?.name }]
            : [
                { title: 'Marketplace', link: '/marketplace/all_listings' },
                { title: projectDetailsData?.details?.name },
              ]
        }
      />
      <Row>
        <Col lg="3">
          {isInviteView && <InviteMemberCard />}
          <LeftSidebarProjectDetails />
        </Col>
        <Col lg="9">
          <CustomStep steps={isInviteView ? InviteView : steps} currentStep={currentStep} onChangeStep={changeStep} />
          <Routes>
            <Route path="bid" element={<BidView />} />
            <Route path="milestone" element={<Milestone />} />
            <Route path="team" element={<TeamView />} />
            <Route path="project/project-invitation/:inviteId" element={<InvitationView />} />
          </Routes>
        </Col>
      </Row>
    </>
  );
};

export default ProjectDetails;
