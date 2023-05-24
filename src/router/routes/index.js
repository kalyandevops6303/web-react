// ** React Imports
import { Fragment, lazy } from 'react';
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

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template';

// ** Default Route
const DefaultRoute = '/register';

const Home = lazy(() => import('../../views/Home'));
const SecondPage = lazy(() => import('../../views/SecondPage'));
const Login = lazy(() => import('../../views/auth/Login'));
const Register = lazy(() => import('../../views/auth/RegisterEmail'));
const ForgotPassword = lazy(() => import('../../views/auth/ForgotPassword'));
const ForgotPassword1 = lazy(() => import('../../views/ForgotPassword'));

const Error = lazy(() => import('../../views/Error'));
const UserType = lazy(() => import('../../views/auth/UserType'));
const VerifyEmail = lazy(() => import('../../views/auth/EmailVerify'));
const VerifyPhone = lazy(() => import('../../views/auth/PhoneVerify'));

const SetPassword = lazy(() => import('../../views/auth/SetPassword'));
const RegisterPhone = lazy(() => import('../../views/auth/RegisterPhone'));
const SetNewPassword = lazy(() => import('../../views/auth/SetNewPassword'));
const ForgotPasswordVerification = lazy(() => import('../../views/auth/ForgotPasswordVerification'));

// ** Merge Routes
const Routes = [
  {
    path: '/',
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/second-page',
    element: <SecondPage />,
  },
  {
    path: '/login',
    element: <Login />,
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/register',
    element: <Register />,
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/register-phone',
    element: <RegisterPhone />,
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/email-verify',
    element: <VerifyEmail />,
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/forgot-password-email-verify',
    element: <ForgotPasswordVerification />,
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/phone-verify',
    element: <VerifyPhone />,
    meta: {
      layout: 'blank',
    },
  },

  {
    path: '/set-password',
    element: <SetPassword />,
    meta: {
      layout: 'blank',
    },
  },

  {
    path: '/usertype',
    element: <UserType />,
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/forgot-password1',
    element: <ForgotPassword1 />,
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/set-new-password',
    element: <SetNewPassword />,
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/error',
    element: <Error />,
    meta: {
      layout: 'blank',
    },
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
