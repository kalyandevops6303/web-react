/* eslint-disable no-undef */
import React, { useEffect, useState, memo } from 'react';
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
import RatingView from './overview/RatingView';
import { getItem } from '../../utility/localStorageControl';

const ProjectDetails = () => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(location?.pathname?.split('/')?.[3]);
  const projectDetailsData = useSelector(projectDetails);
  const invitedByData = useSelector((state) => state.projectDetails.invitedBy);

  const changeStep = (step) => {
    setCurrentStep(step);
  };
  useEffect(() => {
    window?.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (projectDetailsData && projectDetailsData.status === 'COMPLETED') {
      steps[steps.length - 1].isDisabled = false;
    }
  }, [projectDetailsData?.status]);

  const isInviteView = location?.pathname?.includes('project-invitation');
  const fromLocationPrimary = () => {
    if (getItem('baseRoute') === 'marketplace')
      return {
        title: 'Marketplace',
        link: `/marketplace/${getItem('selectedMarketplaceTab') ? getItem('selectedMarketplaceTab') : 'all_listings'}`,
      };
    if (getItem('baseRoute') === 'projects') return { title: 'Project', link: '/projects' };
    if (getItem('baseRoute') === 'notification') return { title: 'Notifications', link: '/notifications' };
    if (getItem('baseRoute') === 'dashboard') return { title: 'Dashboard', link: '/dashboard' };
    if (getItem('baseRoute') === 'my-teams') return { title: 'My teams', link: '/my-teams' };
    return '';
  };
  return (
    <div>
      <BreadCrumbs
        data={
          isInviteView
            ? [{ title: projectDetailsData?.details?.name }]
            : [fromLocationPrimary(), { title: projectDetailsData?.details?.name }]
        }
      />
      <Row>
        <Col lg="3">
          {isInviteView && invitedByData && <InviteMemberCard />}
          <LeftSidebarProjectDetails />
        </Col>
        <Col lg="9">
          <CustomStep steps={isInviteView ? InviteView : steps} currentStep={currentStep} onChangeStep={changeStep} />
          <Routes>
            <Route path="bid" element={<BidView />} />
            <Route path="milestone" element={<Milestone />} />
            <Route path="team" element={<TeamView />} />
            <Route path="rating" element={<RatingView />} />
            <Route path="project/project-invitation/:inviteId" element={<InvitationView />} />
            <Route path="milestone/project-invitation/milestone" element={<Milestone />} />
            <Route path="project/project-invitation-by-client/:inviteId" element={<InvitationView />} />
          </Routes>
        </Col>
      </Row>
    </div>
  );
};

export default memo(ProjectDetails);
