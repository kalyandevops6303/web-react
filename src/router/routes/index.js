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
import CreateFlexternProject from '@flexternships/app/create-project/page';
import { isFlexternshipApp } from '@/configs/api/env';
import { FlexternshipRoutes } from './flexternship-routes';
import { OneOffRoutes } from './one-off-routes';

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Merge Routes
// const Routes = isFlexternshipApp ? FlexternshipRoutes : OneOffRoutes;
const Routes = FlexternshipRoutes;

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

export { Routes, getRoutes };
