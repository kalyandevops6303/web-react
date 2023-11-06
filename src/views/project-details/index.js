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
import BidMilestone from './overview/BidMilestone';
import PaymentTab from './payment/PaymentTab';
import MilestonePaymentListing from './payment/MilestonePaymentListing';
import { userData } from '../../redux/selectors/dashboardSelectors';
import { userTypes } from '../../utility/constants/Constant';

const ProjectDetails = () => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(location?.pathname?.split('/')?.[3]);
  const projectDetailsData = useSelector(projectDetails);
  const invitedByData = useSelector((state) => state.projectDetails.invitedBy);
  const user = useSelector(userData);
  const [stepsArray, setStepsArray] = useState(steps);
  const [stepsArrayInvite, setStepsArrayInvite] = useState(InviteView);

  const isMilestoneTab = location.pathname?.split('/')[3] === 'milestone';
  const isClient = user.user_type === userTypes.client;

  const changeStep = (step) => {
    setCurrentStep(step);
  };
  useEffect(() => {
    window?.scrollTo(0, 0);
  }, []);

  const isInviteView = location?.pathname?.includes('project-invitation');

  useEffect(() => {
    let updatedSteps = [];
    if (projectDetailsData) {
      updatedSteps = [...steps]; // Create a copy of the original steps array
      if (projectDetailsData.status === 'COMPLETED') {
        const milestoneIndex = 2; // Index of the 'Milestone' step
        updatedSteps[milestoneIndex] = { ...updatedSteps[milestoneIndex], isDisabled: false };
        const paymentIndex = 3; // Index of the 'Payment' step
        updatedSteps[paymentIndex] = { ...updatedSteps[paymentIndex], isDisabled: false };
        const ratingIndex = 4; // Index of the 'Rating' step
        updatedSteps[ratingIndex] = { ...updatedSteps[ratingIndex], isDisabled: false };
      }
      if (projectDetailsData.status === 'ON_GOING') {
        const milestoneIndex = 2; // Index of the 'Milestone' step
        updatedSteps[milestoneIndex] = { ...updatedSteps[milestoneIndex], isDisabled: false };
        const paymentIndex = 3; // Index of the 'Payment' step
        updatedSteps[paymentIndex] = { ...updatedSteps[paymentIndex], isDisabled: false };
      }
      setStepsArray(updatedSteps);
    }
  }, [projectDetailsData?.status]);

  useEffect(() => {
    let updatedInviteSteps = [];
    if (invitedByData?.request_status === 'READ_ONLY') {
      updatedInviteSteps = [...InviteView]; // Create a copy of the original steps array
      updatedInviteSteps[1] = { ...updatedInviteSteps[1], isDisabled: true };
      setStepsArrayInvite(updatedInviteSteps);
    }
  }, [invitedByData?.request_status]);

  const fromLocationPrimary = () => {
    if (getItem('baseRoute') === 'marketplace')
      return {
        title: 'Marketplace',
        link: `/marketplace/${getItem('selectedMarketplaceTab') ? getItem('selectedMarketplaceTab') : 'all_listings'}`,
      };

    if (getItem('baseRoute') === 'projects')
      return {
        title: 'Project',
        link: `/projects/${getItem('selectedProjectTab') ? getItem('selectedProjectTab') : 'all_listings'}`,
      };
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
          {isMilestoneTab && isClient ? <MilestonePaymentListing /> : null}
        </Col>
        <Col lg="9">
          <CustomStep
            steps={isInviteView ? stepsArrayInvite : stepsArray}
            currentStep={currentStep}
            onChangeStep={changeStep}
          />
          <Routes>
            <Route path="bid" element={<BidView />} />
            <Route path="milestone" element={<Milestone />} />
            <Route path="payment" element={<PaymentTab />} />
            <Route path="team" element={<TeamView />} />
            <Route path="rating" element={<RatingView />} />
            <Route path="project/project-invitation/:inviteId" element={<InvitationView />} />
            <Route path="milestone/project-invitation/:inviteId" element={<BidMilestone />} />
            <Route path="project/project-invitation-by-client/:inviteId" element={<InvitationView />} />
          </Routes>
        </Col>
      </Row>
    </div>
  );
};

export default memo(ProjectDetails);
