/* eslint-disable no-undef */
import React, { useEffect, useState, memo } from 'react';
import { useSelector } from 'react-redux';
import BreadCrumbs from '@components/breadcrumbs';
import { Col, Row } from 'reactstrap';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';

import LeftSidebarProjectDetails from './overview/LeftSidebarProjectDetails';
import CustomStep from '../../@core/components/custom-stepper';
import { InviteView, stepName, steps } from './overview/constants';
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
import { truncateSentence } from '../../utility/Utils';

const ProjectDetails = () => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(location?.pathname?.split('/')?.[3]);
  const projectDetailsData = useSelector(projectDetails);
  const invitedByData = useSelector((state) => state.projectDetails.invitedBy);
  const user = useSelector(userData);
  const [stepsArray, setStepsArray] = useState(steps);
  const [stepsArrayInvite, setStepsArrayInvite] = useState(InviteView);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const params = useParams();

  const isMilestoneTab = location.pathname?.split('/')[3] === 'milestone';
  const isClient = user?.user_type === userTypes.client;

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
      if (projectDetailsData.status === 'ACTIVE') {
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
    const baseRoute = getItem('baseRoute');

    switch (baseRoute) {
      case 'marketplace':
        return {
          title: 'Marketplace',
          link: `/marketplace/${getItem('selectedMarketplaceTab') || 'all_listings'}`,
        };
      case 'projects':
        return {
          title: 'Project',
          link: `/projects/${getItem('selectedProjectTab') || 'all_listings'}`,
        };
      case 'notification':
        return { title: 'Notifications', link: '/notifications' };
      case 'dashboard':
        return { title: 'Dashboard', link: '/dashboard' };
      case 'my-teams':
        return { title: 'My teams', link: '/my-teams' };
      default:
        return '';
    }
  };

  const getLocationTernery = () => {
    const lowercasedStep = currentStep.toLowerCase();

    switch (lowercasedStep) {
      case stepName.team.toLowerCase():
        return { title: 'Team' };
      case stepName.bid.toLowerCase():
        return { title: 'Bid' };
      case stepName.milestone.toLowerCase():
        return {
          title: 'Milestones',
          link: `/project-details/${params.projectId}/milestone`,
        };
      case stepName.payment.toLowerCase():
        return { title: 'Payment' };
      case stepName.rating.toLowerCase():
        return { title: 'Rating' };
      default:
        return '';
    }
  };

  const generalBreadcrumb = [
    fromLocationPrimary(),
    { title: truncateSentence({ sentence: projectDetailsData?.details?.name, maxCharacters: 30 }) },
    getLocationTernery(),
    { title: selectedMilestone?.name || null },
  ];

  return (
    <div>
      <BreadCrumbs
        data={
          isInviteView
            ? [{ title: truncateSentence({ sentence: projectDetailsData?.details?.name, maxCharacters: 30 }) }]
            : generalBreadcrumb
        }
      />
      <Row>
        <Col lg="3">
          {isInviteView && invitedByData && <InviteMemberCard />}
          <LeftSidebarProjectDetails />
          {isMilestoneTab && isClient ? <MilestonePaymentListing /> : null}
        </Col>
        <Col lg="9">
          {selectedMilestone === null && (
            <CustomStep
              steps={isInviteView ? stepsArrayInvite : stepsArray}
              currentStep={currentStep}
              onChangeStep={changeStep}
            />
          )}
          <Routes>
            <Route path="bid" element={<BidView />} />
            <Route
              path="milestone"
              element={<Milestone selectedMilestone={selectedMilestone} setSelectedMilestone={setSelectedMilestone} />}
            />
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
