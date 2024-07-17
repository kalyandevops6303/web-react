/* eslint-disable no-undef */
import React, { useEffect, useState, memo } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumbs from '@components/breadcrumbs';
import { Col, Row } from 'reactstrap';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import LeftSidebarProjectDetails from './overview/LeftSidebarProjectDetails';
import { InviteView, stepName, steps, infrastructureStep } from './overview/constants';
import BidView from './overview/BidView';
import TeamView from './overview/TeamView';
import { projectDetails } from '../../redux/selectors/projectDetailsSelectors';
import InviteMemberCard from './overview/InviteMemberCard';
import InvitationView from './overview/InvitationView';
import Milestone from './milestones/Milestone';
import RatingView from './overview/RatingView';
import InfrastructureView from './overview/infrastructure/InfrastructureView';
import { getItem } from '../../utility/localStorageControl';
import BidMilestone from './overview/BidMilestone';
import PaymentTab from './payment/PaymentTab';
import MilestonePaymentListing from './payment/MilestonePaymentListing';
import { userData } from '../../redux/selectors/dashboardSelectors';
import { CHECKOUT_STATUS, projectStatusEnum, userTypes } from '../../utility/constants/Constant';
import { truncateSentence } from '../../utility/Utils';
import theme from '../../configs/themeVariables';
import MilestoneDetails from './milestones/MilestoneDetails';
import ProjectDetailsNavbar from './overview/ProjectDetailsNavbar';
import DownloadCertificate from './overview/DownloadCertificate';
import { updatePaymentStatus } from '../../redux/actions/milestonePaymentActions';
import { downloadCertificate } from '../../redux/actions/projectDetailsAction';
import { verifyInfraAccessService } from '../../services/infrastructureServices';

const ProjectDetailsWrapper = styled.div`
  .content-header-left {
    margin-bottom: 0 !important;
  }
  .top-head {
    position: relative;
    .fixed-header {
      top: 4rem;
      left: 0;
      position: fixed;
      z-index: 20;
      background-color: ${theme.bodyBgColor};
      width: 100%;
      padding: 1.5rem 2rem 0.8rem 1rem;
    }
  }
`;

const ProjectDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(location?.pathname?.split('/')?.[3]);
  const [infrastructureAccess, setInfrastructureAccess] = useState(false);
  const [downloadCertificateURL, setDownloadCertificateURL] = useState('');
  const projectDetailsData = useSelector(projectDetails);
  const invitedByData = useSelector((state) => state.projectDetails.invitedBy);
  const user = useSelector(userData);

  const [stepsArray, setStepsArray] = useState(steps);
  const [stepsArrayInvite, setStepsArrayInvite] = useState(InviteView);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const currentMilestone = useSelector((state) => state.milestone.milestoneData);
  const params = useParams();

  const isMilestoneTab = location.pathname?.split('/')[3] === 'milestone';
  const isClient = user?.user_type === userTypes.client;

  const changeStep = (step) => {
    setCurrentStep(step);
  };

  const verifyInfrastructureAccess = () => {
    setInfrastructureAccess(false);
    verifyInfraAccessService()
      .then(() => {
        // console.log("Access Given");
        setInfrastructureAccess(true);
      })
      .catch(() => {
        // console.log('Infra access denied');
      });
  };

  useEffect(() => {
    verifyInfrastructureAccess();
    window?.scrollTo(0, 0);
  }, []);

  const queryParams = new URLSearchParams(window.location.search);

  // Extract the checkout status
  const checkoutStatus = queryParams.get('checkout_status');
  const sessionId = queryParams.get('session_id');

  useEffect(() => {
    if (checkoutStatus === CHECKOUT_STATUS.CANCELLED) {
      dispatch(updatePaymentStatus({ session_id: sessionId }));
    }
  }, [checkoutStatus]);

  const isInviteView = location?.pathname?.includes('project-invitation');
  const { projectId } = params;

  const onSuccess = (data) => {
    setDownloadCertificateURL(data);
  };

  useEffect(() => {
    let updatedSteps = [];
    if (projectDetailsData) {
      updatedSteps = [...steps]; // Create a copy of the original steps array
      if (projectDetailsData.status === projectStatusEnum.COMPLETED) {
        const milestoneIndex = 2; // Index of the 'Milestone' step
        updatedSteps[milestoneIndex] = { ...updatedSteps[milestoneIndex], isDisabled: false };
        const paymentIndex = 3; // Index of the 'Payment' step
        updatedSteps[paymentIndex] = { ...updatedSteps[paymentIndex], isDisabled: false };
        const ratingIndex = 4; // Index of the 'Rating' step
        updatedSteps[ratingIndex] = { ...updatedSteps[ratingIndex], isDisabled: false };
      }
      if (projectDetailsData.status === projectStatusEnum.ON_GOING) {
        const milestoneIndex = 2; // Index of the 'Milestone' step
        updatedSteps[milestoneIndex] = { ...updatedSteps[milestoneIndex], isDisabled: false };
        const paymentIndex = 3; // Index of the 'Payment' step
        updatedSteps[paymentIndex] = { ...updatedSteps[paymentIndex], isDisabled: false };
      }
      if (projectDetailsData.status === projectStatusEnum.ACTIVE) {
        const milestoneIndex = 2; // Index of the 'Milestone' step
        updatedSteps[milestoneIndex] = { ...updatedSteps[milestoneIndex], isDisabled: false };
        const paymentIndex = 3; // Index of the 'Payment' step
        updatedSteps[paymentIndex] = { ...updatedSteps[paymentIndex], isDisabled: false };
      }

      // Append irrespective of the status
      if (infrastructureAccess && isClient) { // Checks if the user is client and has infrastructure access
        updatedSteps.push({ ...infrastructureStep, isDisabled: false }); // add a new step
      }

      setStepsArray(updatedSteps);
    }
  }, [projectDetailsData?.status, infrastructureAccess]);

  useEffect(() => {
    let updatedInviteSteps = [];
    if (invitedByData?.request_status === 'READ_ONLY') {
      updatedInviteSteps = [...InviteView]; // Create a copy of the original steps array
      updatedInviteSteps[1] = { ...updatedInviteSteps[1], isDisabled: true };
      setStepsArrayInvite(updatedInviteSteps);
    }
  }, [invitedByData?.request_status]);

  useEffect(() => {
    if (projectDetailsData?.status === projectStatusEnum.COMPLETED && projectDetailsData?.completed_certificates && !isClient) {
      dispatch(downloadCertificate({ project_id: projectId, onSuccess }));
    }
  }, [projectDetailsData?.status]);

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
      case 'payments':
        return { title: 'Payments', link: '/payments' };
      default:
        return '';
    }
  };

  const getLocationTernery = () => {
    const lowercasedStep = currentStep?.toLowerCase();

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
      case stepName.milestoneDetails.toLowerCase():
        return {
          title: 'Milestones',
          link: `/project-details/${params.projectId}/milestone`,
        };

      case stepName.payment.toLowerCase():
        return { title: 'Payment' };
      case stepName.rating.toLowerCase():
        return { title: 'Rating' };
      case stepName.infrastructure.toLowerCase():
        return {
          title: 'Infrastructure',
          link: `/project-details/${params.projectId}/infrastructure`,
        };
      default:
        return '';
    }
  };

  const generalBreadcrumb = [
    fromLocationPrimary(),
    {
      title: truncateSentence({ sentence: projectDetailsData?.details?.name, maxCharacters: 30 }),
      link: params?.projectId ? `/project-details/${params?.projectId}/bid` : null,
    },
    getLocationTernery(),
    { title: currentMilestone?.name || null },
  ];

  const milestoneDetails = params?.['*'].includes('milestone-details');

  return (
    <ProjectDetailsWrapper>
      <div className="top-head">
        <div className="fixed-header">
          <BreadCrumbs
            data={
              isInviteView
                ? [{ title: truncateSentence({ sentence: projectDetailsData?.details?.name, maxCharacters: 30 }) }]
                : generalBreadcrumb
            }
          />
        </div>
      </div>
      <Row className="mt-3">
        <Col lg="3">
          {isInviteView && invitedByData && <InviteMemberCard />}
          {projectDetailsData?.completed_certificates && downloadCertificateURL && !isClient && (
            <DownloadCertificate downloadUrl={downloadCertificateURL} />
          )}
          <LeftSidebarProjectDetails />
          {isMilestoneTab && isClient ? <MilestonePaymentListing /> : null}
        </Col>
        <Col lg="9">
          {!milestoneDetails && (
            <ProjectDetailsNavbar
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
            <Route path="infrastructure" element={<InfrastructureView />} />
            <Route path="project/project-invitation/:inviteId" element={<InvitationView />} />
            <Route path="milestone/project-invitation/:inviteId" element={<BidMilestone />} />
            <Route path="project/project-invitation-by-client/:inviteId" element={<InvitationView />} />
            <Route
              path="milestone-details/:milestoneId"
              element={
                <MilestoneDetails selectedMilestone={selectedMilestone} setSelectedMilestone={setSelectedMilestone} />
              }
            />
          </Routes>
        </Col>
      </Row>
    </ProjectDetailsWrapper>
  );
};

export default memo(ProjectDetails);
