// ** React Imports
import { Navigate } from 'react-router-dom';

// ** Route Components
// import PublicRoute from '@components/routes/PublicRoute';

// ** Dashboard & User Views
import CreateFlexternProject from '@flexternships/app/create-project/page';
import FlexternshipClientOnboarding from '@flexternships/app/onboarding/client/page';
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
import ForgotPasswordVerification from '../../views/auth/ForgotPasswordVerification';
import GiveMilestoneFeedback from '@/flexternships/app/components/pages/beta-feedback/index';

// ** Project Views
import Projects from '../../views/projects';

// ** Constants & Enums
import { FlexternUserAppRole, FlexternUserCheckpoint } from '@/flexternships/constraints/enums/core-enums';
import { FEATURE_NAMES } from '@/utility/constants/Constant';
import routes from '@/flexternships/routes';

// ** Flexternship Project Components
import FlexternshipProjectDetails from '@/flexternships/app/project-details/page';
import FlexternshipsContractView from '@/flexternships/app/project-details/sign-documents/page';
import FlexternProjectQuickActions from '@/flexternships/app/quick-actions/page';

// ** Flexternship Onboarding & Profile
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
import TermsAndConditions from '@/flexternships/app/profile/terms-and-conditions/page';
import AssessmentsPage from '@/flexternships/app/assessments/page';

// ** Default Route
const DefaultRoute = routes.auth.path;

// ** Merge Routes
const FlexternshipRoutes = [
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
            appRole: FlexternUserAppRole.PROJECT_ADVISOR,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT_DELEGATE,
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
            appRole: FlexternUserAppRole.PROJECT_ADVISOR,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT_DELEGATE,
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
            appRole: FlexternUserAppRole.PROJECT_ADVISOR,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT_DELEGATE,
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
        <ClientPublicProfile />
      </RoleAccessWrapper>
    ),
  },
  {
    path: routes.talentProfile.path,
    element: <UserDetails />,
  },
  {
    path: `${routes.marketplace.path}/*`,
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.PROJECT_ADVISOR,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT_DELEGATE,
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
            appRole: FlexternUserAppRole.PROJECT_ADVISOR,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT_DELEGATE,
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
            appRole: FlexternUserAppRole.PROJECT_ADVISOR,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT_DELEGATE,
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
            appRole: FlexternUserAppRole.PROJECT_ADVISOR,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT_DELEGATE,
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
        allowBlockedUsers
      >
        <FlexternshipProjectDetails />
      </RoleAccessWrapper>
    ),
  },
  {
    path: routes.projectDoc.path,
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_TALENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [],
          },
        ]}
      >
        <FlexternshipsContractView />
      </RoleAccessWrapper>
    ),
  },
  {
    path: routes.blockedProjects.path,
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.PROJECT_ADVISOR,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT_DELEGATE,
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
            appRole: FlexternUserAppRole.PROJECT_ADVISOR,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT_DELEGATE,
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
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_TALENT,
            allowCheckpoints: [FlexternUserCheckpoint.ACCOUNT_DETAILS, FlexternUserCheckpoint.PROFILE_DETAILS],
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
        <TalentOnboarding />
      </RoleAccessWrapper>
    ),
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
            appRole: FlexternUserAppRole.PROJECT_ADVISOR,
            allowCheckpoints: [FlexternUserCheckpoint.ACCOUNT_DETAILS],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.COMPLETE,
                redirectRoute: routes.dashboard.path,
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT_DELEGATE,
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
    path: routes.talentProfileEdit.path,
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.FLEXTERN_TALENT,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [],
          },
        ]}
      >
        <TalentOnboarding />
      </RoleAccessWrapper>
    ),
  },
  {
    path: routes.clientProfileEdit.path,
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.PROJECT_ADVISOR,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT_DELEGATE,
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
            appRole: FlexternUserAppRole.PROJECT_ADVISOR,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT_DELEGATE,
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
            appRole: FlexternUserAppRole.PROJECT_ADVISOR,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT_DELEGATE,
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
            appRole: FlexternUserAppRole.PROJECT_ADVISOR,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT_DELEGATE,
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
            appRole: FlexternUserAppRole.PROJECT_ADVISOR,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT_DELEGATE,
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
            appRole: FlexternUserAppRole.PROJECT_ADVISOR,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT_DELEGATE,
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
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.PROJECT_ADVISOR,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT_DELEGATE,
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
        <IndividualAnalytics />
      </RoleAccessWrapper>
    ),
  },
  {
    path: routes.teamAnalytics.path,
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.PROJECT_ADVISOR,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT_DELEGATE,
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
        <TeamAnalytics />
      </RoleAccessWrapper>
    ),
  },
  {
    path: routes.conversationParticipation.path,
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.PROJECT_ADVISOR,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT_DELEGATE,
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
        <ConversationParticipationPage />
      </RoleAccessWrapper>
    ),
  },
  {
    path: routes.commits.path,
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.PROJECT_ADVISOR,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT_DELEGATE,
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
        <Commits />
      </RoleAccessWrapper>
    ),
  },
  {
    path: routes.commitsIndividual.path,
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.PROJECT_ADVISOR,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT_DELEGATE,
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
        <Commits />
      </RoleAccessWrapper>
    ),
  },
  {
    path: routes.assessments.path,
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
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
        <AssessmentsPage />
      </RoleAccessWrapper>
    ),
  },
  {
    path: routes.setNewPassword.path,
    element: <ForgotPasswordVerification />,
    meta: {
      layout: 'blank',
    },
  },
  {
    path: routes.termsAndConditions.path,
    element: <TermsAndConditions />,
    meta: {
      layout: 'blank',
    },
  },
  {
    path: routes.betaMilestoneFeedback.path,
    element: (
      <RoleAccessWrapper
        allowedAppRoles={[
          {
            appRole: FlexternUserAppRole.PROJECT_ADVISOR,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
          {
            appRole: FlexternUserAppRole.FLEXTERN_CLIENT_DELEGATE,
            allowCheckpoints: [FlexternUserCheckpoint.COMPLETE],
            blockCheckpoints: [
              {
                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                redirectRoute: routes.clientOnboarding.path,
              },
            ],
          },
        ]}
        // featureName={FEATURE_NAMES.AYESHA_BOT}
        // fallbackRoute={routes.dashboard.path}
      >
        <GiveMilestoneFeedback />
      </RoleAccessWrapper>
    ),
  },
];

export default FlexternshipRoutes;
