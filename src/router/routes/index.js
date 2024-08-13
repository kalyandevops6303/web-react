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

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template';

// ** Default Route
const DefaultRoute = '/auth';

// ** Merge Routes
const Routes = [
  {
    path: '/',
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  {
    path: '/dashboard',
    element: <PrivateDashboard />,
  },
  {
    path: '/search',
    element: <Search />,
  },
  {
    path: '/profile/:userType/:userId',
    element: <UserDetails />,
  },
  {
    path: '/marketplace/*',
    element: <MarketPlace />,
  },
  {
    path: '/project-details/:projectId/*',
    element: <ProjectDetails />,
  },
  {
    path: '/project-details/:projectId/bid/:bidId',
    element: <BidDetails />,
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
    path: '/projects/*',
    element: <Projects />,
  },
  {
    path: '/my-teams/*',
    element: <MyTeams />,
  },

  {
    path: '/clubs/*',
    element: <Clubs />,
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
    path: `/${userOnboarding.client}/:section-details`,
    element: <ClientOnboarding />,
    meta: {
      layout: 'blank',
    },
  },
  {
    path: `/${userProfileEdit.talent}/:section-details`,
    element: <TalentOnboarding />,
  },
  {
    path: `/${userProfileEdit.client}/:section-details`,
    element: <ClientOnboarding />,
  },
  {
    path: '/create-project',
    element: <CreateProject />,
  },
  {
    path: '/create-project/:projectId',
    element: <CreateProject />,
  },
  {
    path: '/notifications',
    element: <Notifications />,
  },
  {
    path: '/create-bid/:projectId/:bidType/:bidId/*',
    element: <CreateBid />,
  },
  {
    path: '/team-invitation/:inviteId',
    element: <TeamInvitation />,
  },
  {
    path: '/join-request/:inviteId',
    element: <TeamInvitation />,
  },
  {
    path: '/club-invitation/:inviteId',
    element: <ClubInvitation />,
  },

  {
    path: '/create-team/:section-details',
    element: <CreateTeam />,
  },
  {
    path: '/create-team/:section-details/:id',
    element: <CreateTeam />,
  },
  {
    path: `/${userProfileEdit.team}/:section-details`,
    element: <CreateTeam />,
  },
  {
    path: '/create-club/:section-details',
    element: <CreateClub />,
  },
  {
    path: `/${userProfileEdit.club}/:section-details`,
    element: <CreateClub />,
  },
  {
    path: '/create-club/:section-details/:id',
    element: <CreateClub />,
  },
  {
    path: '/disputes/*',
    element: <Disputes />,
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
    path: '/payments',
    element: <PaymentFullView />,
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
    path: '*',
    element: <NotFound />,
  },
];

// eslint-disable-next-line consistent-return
const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    }
    return {};
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) && defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          // eslint-disable-next-line no-unused-expressions
          route.meta.layout === 'blank' ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
              LayoutWrapper
              : Fragment;

          // eslint-disable-next-line no-param-reassign
          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || 'vertical';
  const layouts = ['vertical', 'horizontal', 'blank'];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: '/',
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
