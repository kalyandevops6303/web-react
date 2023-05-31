import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Spinner from '../../@core/components/spinner/Fallback-spinner';
import { OnBoardWrap } from './style';

const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./RegisterEmail'));
const ForgotPassword = lazy(() => import('./ForgotPassword'));
const UserType = lazy(() => import('./UserType'));
const VerifyEmail = lazy(() => import('./EmailVerify'));
const VerifyPhone = lazy(() => import('./PhoneVerify'));
const SetPassword = lazy(() => import('./SetPassword'));
const RegisterPhone = lazy(() => import('./RegisterPhone'));
const SetNewPassword = lazy(() => import('./SetNewPassword'));
const ForgotPasswordVerification = lazy(() => import('./ForgotPasswordVerification'));

const AuthRoute = () => {
  const routes = [
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/auth/*',
      element: <AuthRoute />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/register-phone',
      element: <RegisterPhone />,
    },
    {
      path: '/email-verify',
      element: <VerifyEmail />,
    },
    {
      path: '/forgot-password-email-verify',
      element: <ForgotPasswordVerification />,
    },
    {
      path: '/phone-verify',
      element: <VerifyPhone />,
    },
    {
      path: '/set-password',
      element: <SetPassword />,
    },
    {
      path: '/usertype',
      element: <UserType />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />,
    },
    {
      path: '/set-new-password',
      element: <SetNewPassword />,
    },
  ];
  return (
    <OnBoardWrap>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<UserType />} />
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Suspense>
    </OnBoardWrap>
  );
};

export default AuthRoute;
