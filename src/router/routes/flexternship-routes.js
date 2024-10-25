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
                                redirectRoute: '/client-onboarding'
                            }
                        ]
                    },
                    {
                        appRole: FlexternUserAppRole.FLEXTERN_TALENT,
                        allowCheckpoints: [FlexternUserCheckpoint.COMPLETE,],
                        blockCheckpoints: [
                            {
                                checkpoint: FlexternUserCheckpoint.ACCOUNT_DETAILS,
                                redirectRoute: '/talent-onboarding/account-details'
                            },
                            {
                                checkpoint: FlexternUserCheckpoint.PROFILE_DETAILS,
                                redirectRoute: '/talent-onboarding/personal-details'
                            }
                        ]
                    }
                ]}
            >
                <PrivateDashboard />
            </RoleAccessWrapper >
        ),
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
                                redirectRoute: '/dashboard'
                            }
                        ]
                    }
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
                                redirectRoute: '/client-onboarding'
                            }
                        ]
                    }
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
                                redirectRoute: '/client-onboarding'
                            }
                        ]
                    }
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
                                redirectRoute: '/client-onboarding'
                            }
                        ]
                    }
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
        }
    },
    {
        path: '*',
        element: <NotFound />,
    },
];
