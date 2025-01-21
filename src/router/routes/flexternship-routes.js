// ** React Imports
import { Fragment } from 'react';
import { Navigate } from 'react-router-dom';
// ** Layouts
import BlankLayout from '@layouts/BlankLayout';
import VerticalLayout from '@src/layouts/VerticalLayout';
import HorizontalLayout from '@src/layouts/HorizontalLayout';
import LayoutWrapper from '@src/@core/layouts/components/layout-wrapper';

// ** Route Components
import PublicRoute from '@components/routes/PublicRoute';

// ** Utils
import { isObjEmpty } from '@utils';

import PrivateDashboard from '../../views/dashboard/PrivateDashboard';
import UserDetails from '../../views/user-details';
import AuthRoute from '../../views/auth/index';
import TalentOnboarding from '../../views/Onboarding/Talent';
import ClientOnboarding from '../../views/Onboarding/Client';
import CreateProject from '../../views/CreateProject';
import MarketPlace from '../../views/marketplace';
import Search from '../../views/search';
import Notifications from '../../views/notifications';
import CreateBid from '../../views/create-bid';
import TeamInvitation from '../../views/team-invitation';
import Disputes from '../../views/disputes';
import CreateTeam from '../../views/createTeam';
import ComingSoon from '../../views/auth/ComingSoon';
import ProjectDetails from '../../views/project-details';
import ContractView from '../../views/project-details/ContractView';
import { userOnboarding, userProfileEdit } from '../../utility/constants/Constant';
import Chat from '../../views/chat';
import Projects from '../../views/projects';
import MyTeams from '../../views/teams';
import Clubs from '../../views/clubs';
import ReferralAndReward from '../../views/ReferralAndReward';
import CreateClub from '../../views/createClub';
import ClubInvitation from '../../views/club-invitation';
import PaymentFullView from '../../views/paymentFullView';
import BidDetails from '../../views/project-details/BidDetails';
import Assessments from '../../views/assessments';
import InternalProjects from '../../views/internal/projects';
import NotFound from '../../views/NotFound';
import ChooseProgram from '../../views/Onboarding/Talent/ChooseProgram';

import { FlexternUserAppRole, FlexternUserCheckpoint } from '@/flexternships/constraints/enums/core-enums';
import CreateFlexternProject from '@flexternships/app/create-project/page';
import FlexternshipClientOnboarding from '@flexternships/app/onboarding/client/page';
import RoleAccessWrapper from '@/flexternships/app/components/core/wrappers/RoleAccessWrapper';
import ProjectsTab from '@/flexternships/app/project-details/tabs/projects/page';
import FlexternshipProjectDetails from '@/flexternships/app/project-details/page';
import FlexternshipsContractView from '@/flexternships/app/project-details/sign-documents/page';
import HandleFeedbacks from '@/flexternships/app/components/pages/project-details/tabs/milestone/feedback/HandleFeedbacks';
import ClientPublicProfile from '@/flexternships/app/profile/client/page';
import RedirectToTeamTab from '@/flexternships/app/components/pages/project-details/RedirectToTeamTab';
import ChatInterface from '@/flexternships/app/components/pages/chat-interface/ChatInterface';
import { FEATURE_NAMES } from '@/utility/constants/Constant';
import Comments from '@/flexternships/app/analytics/individual-analytics/comments/page';
import VerifyInvitation from '@/flexternships/app/verify-invitation/page';
import FlexternProjectRecognition from '@/flexternships/app/recognition/page';
import TeamPerformanceInsights from '@/flexternships/app/analytics/team-analytics/performance-insights/page';
import IndividualAnalytics from '@/flexternships/app/analytics/individual-analytics/page';
import TeamAnalytics from '@/flexternships/app/analytics/team-analytics/page';

// ** Default Route
const DefaultRoute = '/auth';

// ** Merge Routes
export const FlexternshipRoutes = [
  {
    path: '/',
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  {
    path: '/dashboard',
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: '/client-onboarding',
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_TALENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: '/talent-onboarding/account-details',
              },
              // {
              //     checkpoint: FlexternUserCheckpoint.PROFILE_DETAILS,
              //     redirectRoute: '/talent-onboarding/personal-details'
              // } removing this as for now as anyway in sign in we are checking for the checkpoint otherwise the first time it's causing after save and continue before updation of checkpoint it's going to personal details
            ],
          },
        ]}
      >
        <PrivateDashboard />
      </RoleAccessWrapper>
    ),
  },
  {
    path: '/analytics/project/:projectId/individual/:userId/comments',
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: '/client-onboarding',
              },
            ],
          },
        ]}
      >
        <Comments />
      </RoleAccessWrapper>
    ),
  },
  {
    path: '/search',
    element: <Search />,
  },
  {
    path: '/profile/client/:userId',
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: '/client-onboarding',
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_TALENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: '/talent-onboarding',
              },
            ],
          },
        ]}
      >
        <ClientPublicProfile />
      </RoleAccessWrapper>
    ),
  },
  {
    path: '/profile/:userType/:userId',
    element: <UserDetails />,
  },
  {
    path: '/marketplace/*',
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: '/client-onboarding',
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_TALENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: '/talent-onboarding',
              },
            ],
          },
        ]}
      >
        <MarketPlace />
      </RoleAccessWrapper>
    ),
  },
  {
    path: '/project-details/:projectId',
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: '/client-onboarding',
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_TALENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: '/talent-onboarding',
              },
            ],
          },
        ]}
        allowBlockedUsers
      >
        <RedirectToTeamTab />
      </RoleAccessWrapper>
    ),
  },
  {
    path: '/project-details/:projectId/:projectStep',
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: '/client-onboarding',
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_TALENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: '/talent-onboarding',
              },
            ],
          },
        ]}
        allowBlockedUsers
      >
        <FlexternshipProjectDetails />
      </RoleAccessWrapper>
    ),
  },
  {
    path: '/project-details/:projectId/milestone/:milestoneId',
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: '/client-onboarding',
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_TALENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: '/talent-onboarding',
              },
            ],
          },
        ]}
        allowBlockedUsers
      >
        <FlexternshipProjectDetails />
      </RoleAccessWrapper>
    ),
  },
  {
    path: '/project-details/:projectId/doc/:docType/*',
    element: <FlexternshipsContractView />,
  },
  {
    path: '/project-details/:projectId/:projectStep/doc/:docType/*',
    element: <ContractView />,
  },
  {
    path: '/project-details/:projectId/:projectStep/doc/:docType/:docId/*',
    element: <ContractView />,
  },
  {
    path: '/projects/blocked',
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: '/client-onboarding',
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_TALENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: '/talent-onboarding',
              },
            ],
          },
        ]}
        allowBlockedUsers
      >
        <Projects />
      </RoleAccessWrapper>
    ),
  },
  {
    path: '/projects/*',
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: '/client-onboarding',
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_TALENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: '/talent-onboarding',
              },
            ],
          },
        ]}
      >
        <Projects />
      </RoleAccessWrapper>
    ),
  },
  {
    path: '/auth/*',
    element: <AuthRoute />,
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/coming-soon',
    element: <ComingSoon />,
    meta: {
      layout: 'blank',
    },
  },
  {
    path: `/${userOnboarding.talent}/:section-details`,
    element: <TalentOnboarding />,
    meta: {
      layout: 'blank',
    },
  },
  {
    path: `/client-onboarding/*`,
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT,
            allowCheckpoints: [FlexternUserCheckpoint.ACCOUNT_DETAILS],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.COMPLETE,
                redirectRoute: '/dashboard',
              },
            ],
          },
        ]}
        noPadding
      >
        <FlexternshipClientOnboarding />
      </RoleAccessWrapper>
    ),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: `/${userProfileEdit.talent}/:section-details`,
    element: <TalentOnboarding />,
  },
  {
    path: `/${userProfileEdit.client}/:tabId`,
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: '/client-onboarding',
              },
            ],
          },
        ]}
      >
        <FlexternshipClientOnboarding />
      </RoleAccessWrapper>
    ),
  },
  {
    path: `/create-project`,
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: '/client-onboarding',
              },
            ],
          },
        ]}
      >
        <CreateFlexternProject />
      </RoleAccessWrapper>
    ),
  },
  {
    path: '/create-project/:projectId',
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: '/client-onboarding',
              },
            ],
          },
        ]}
      >
        <CreateFlexternProject />
      </RoleAccessWrapper>
    ),
  },
  {
    path: '/notifications',
    element: <Notifications />,
  },
  {
    path: '/referral-reward/*',
    element: <ReferralAndReward />,
  },
  {
    path: '/chat',
    element: <Chat />,
  },
  {
    path: '/assessments',
    element: <Assessments />,
  },
  {
    path: '/internal/projects',
    element: <InternalProjects />,
  },
  {
    path: `/${userProfileEdit.talent}/intern-hiring`,
    element: <TalentOnboarding />,
  },
  {
    path: `/${userProfileEdit.talent}/intern-xobin-hiring`,
    element: <TalentOnboarding />,
  },
  {
    path: `/${userOnboarding.talent}/intern-hiring`,
    element: <TalentOnboarding />,
  },
  {
    path: `/${userOnboarding.talent}/intern-xobin-hiring`,
    element: <TalentOnboarding />,
  },
  {
    path: `${userOnboarding.talent}/choose-program`,
    element: <ChooseProgram />,
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/project-details/:projectId/milestone/:milestoneId/feedback/:feedbackType',
    element: <HandleFeedbacks />,
  },
  {
    path: '/chat-interface',
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: '/client-onboarding',
              },
            ],
          },
        ]}
        featureName={FEATURE_NAMES.AYESHA_BOT}
        fallbackRoute="/dashboard"
      >
        <ChatInterface />
      </RoleAccessWrapper>
    ),
  },
  {
    path: '/verify-invitation',
    element: <VerifyInvitation />,
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/recognition/:projectId',
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: '/client-onboarding',
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_TALENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: '/talent-onboarding/account-details',
              },
              {
                checkpoint: FlexternUserCheckpoint.PROFILE_DETAILS,
                redirectRoute: '/talent-onboarding/personal-details',
              },
            ],
          },
        ]}
      >
        <FlexternProjectRecognition />
      </RoleAccessWrapper>
    ),
  },
  {
    path: '/analytics/project/:projectId/team/performance-insights',
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: '/client-onboarding',
              },
            ],
          },
        ]}
      >
        <TeamPerformanceInsights />
      </RoleAccessWrapper>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/analytics/project/:projectId/individual/:userId',
    element: <IndividualAnalytics />,
  },
  {
    path: '/analytics/project/:projectId/team',
    element: <TeamAnalytics />,
  },
];
