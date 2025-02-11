// ** React Imports
import { Navigate } from 'react-router-dom';

// ** Route Components
import PublicRoute from '@components/routes/PublicRoute';

// ** Dashboard & User Views
import PrivateDashboard from '../../views/dashboard/PrivateDashboard';
import UserDetails from '../../views/user-details';
import MarketPlace from '../../views/marketplace';
import Search from '../../views/search';
import Notifications from '../../views/notifications';
import NotFound from '../../views/NotFound';

// ** Auth & Onboarding Views
import AuthRoute from '../../views/auth/index';
import TalentOnboarding from '../../views/Onboarding/Talent';
import ComingSoon from '../../views/auth/ComingSoon';
import ChooseProgram from '../../views/Onboarding/Talent/ChooseProgram';

// ** Project Views
import Projects from '../../views/projects';
import ContractView from '../../views/project-details/ContractView';

// ** Constants & Enums
import { userOnboarding, userProfileEdit } from '../../utility/constants/Constant';
import { FlexternUserAppRole, FlexternUserCheckpoint } from '@/flexternships/constraints/enums/core-enums';
import { FEATURE_NAMES } from '@/utility/constants/Constant';
import routes from '@/flexternships/routes';

// ** Flexternship Project Components
import CreateFlexternProject from '@flexternships/app/create-project/page';
import FlexternshipProjectDetails from '@/flexternships/app/project-details/page';
import FlexternshipsContractView from '@/flexternships/app/project-details/sign-documents/page';
import FlexternProjectQuickActions from '@/flexternships/app/quick-actions/page';

// ** Flexternship Onboarding & Profile
import FlexternshipClientOnboarding from '@flexternships/app/onboarding/client/page';
import ClientPublicProfile from '@/flexternships/app/profile/client/page';

// ** Flexternship Core Components
import RoleAccessWrapper from '@/flexternships/app/components/core/wrappers/RoleAccessWrapper';
import RedirectToTeamTab from '@/flexternships/app/components/pages/project-details/RedirectToTeamTab';
import HandleFeedbacks from '@/flexternships/app/components/pages/project-details/tabs/milestone/feedback/HandleFeedbacks';
import ChatInterface from '@/flexternships/app/components/pages/chat-interface/ChatInterface';
import VerifyInvitation from '@/flexternships/app/verify-invitation/page';

// ** Analytics Components
import Comments from '@/flexternships/app/analytics/individual-analytics/comments/page';
import TeamPerformanceInsights from '@/flexternships/app/analytics/team-analytics/performance-insights/page';
import IndividualAnalytics from '@/flexternships/app/analytics/individual-analytics/page';
import TeamAnalytics from '@/flexternships/app/analytics/team-analytics/page';
import ConversationParticipationPage from '@/flexternships/app/analytics/individual-analytics/conversation-participation/page';
import Commits from '@/flexternships/app/analytics/individual-analytics/commits/page';

// ** Default Route
const DefaultRoute = routes.auth.path;

// ** Merge Routes
export const FlexternshipRoutes = [
  {
    path: routes.home.path,
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  {
    path: routes.dashboard.path,
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_TALENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.talentOnboarding.generate('account-details'),
              },
            ],
          },
        ]}
      >
        <PrivateDashboard />
      </RoleAccessWrapper>
    ),
  },
  {
    path: routes.comments.path,
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
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
    path: routes.search.path,
    element: <Search />,
  },
  {
    path: routes.clientProfile.path,
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_TALENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.talentOnboarding.path,
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
    path: routes.userProfile.path,
    element: <UserDetails />,
  },
  {
    path: `${routes.marketplace.path}/*`,
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_TALENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.talentOnboarding.path,
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
    path: routes.projectDetails.path,
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_TALENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.talentOnboarding.path,
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
    path: routes.projectDetailsWithStep.path,
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_TALENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.talentOnboarding.path,
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
    path: routes.milestone.path,
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_TALENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.talentOnboarding.path,
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
    path: routes.projectDoc.path,
    element: <FlexternshipsContractView />,
  },
  {
    path: routes.projectStepDoc.path,
    element: <ContractView />,
  },
  {
    path: routes.projectStepDocId.path,
    element: <ContractView />,
  },
  {
    path: routes.blockedProjects.path,
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_TALENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.talentOnboarding.path,
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
    path: `${routes.projects.path}/*`,
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_TALENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.talentOnboarding.path,
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
    path: `${routes.auth.path}/*`,
    element: <AuthRoute />,
    meta: {
      layout: 'blank',
    },
  },
  {
    path: routes.comingSoon.path,
    element: <ComingSoon />,
    meta: {
      layout: 'blank',
    },
  },
  {
    path: routes.talentOnboarding.path,
    element: <TalentOnboarding />,
    meta: {
      layout: 'blank',
    },
  },
  {
    path: `${routes.clientOnboarding.path}/*`,
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT,
            allowCheckpoints: [FlexternUserCheckpoint.ACCOUNT_DETAILS],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.COMPLETE,
                redirectRoute: routes.dashboard.path,
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
                redirectRoute: routes.clientOnboarding.path,
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
    path: routes.createProject.path,
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
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
    path: routes.editProject.path,
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
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
    path: routes.notifications.path,
    element: <Notifications />,
  },
  {
    path: routes.chooseTalentProgram.path,
    element: <ChooseProgram />,
    meta: {
      layout: 'blank',
    },
  },
  {
    path: routes.milestoneFeedback.path,
    element: <HandleFeedbacks />,
  },
  {
    path: routes.chatInterface.path,
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
        ]}
        featureName={FEATURE_NAMES.AYESHA_BOT}
        fallbackRoute={routes.dashboard.path}
      >
        <ChatInterface />
      </RoleAccessWrapper>
    ),
  },
  {
    path: routes.verifyInvitation.path,
    element: <VerifyInvitation />,
    meta: {
      layout: 'blank',
    },
  },
  {
    path: routes.quickActions.path,
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_TALENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.talentOnboarding.generate('account-details'),
              },
              {
                checkpoint: FlexternUserCheckpoint.PROFILE_DETAILS,
                redirectRoute: routes.talentOnboarding.generate('personal-details'),
              },
            ],
          },
        ]}
      >
        <FlexternProjectQuickActions />
      </RoleAccessWrapper>
    ),
  },
  {
    path: routes.teamPerformanceInsights.path,
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
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
    path: routes.individualAnalytics.path,
    element: <IndividualAnalytics />,
  },
  {
    path: routes.teamAnalytics.path,
    element: <TeamAnalytics />,
  },
  {
    path: routes.conversationParticipation.path,
    element: <ConversationParticipationPage />,
  },
  {
    path: routes.commits.path,
    element: <Commits />,
  },
];
