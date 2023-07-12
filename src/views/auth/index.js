/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPic from '@src/assets/images/auth/login.png';
import RegisterPic from '@src/assets/images/auth/register.svg';
import CreatePWPic from '@src/assets/images/auth/password.svg';
import UserTypePic from '@src/assets/images/auth/user_type.svg';
import VerificationPic from '@src/assets/images/auth/verification.svg';

import Spinner from '../../@core/components/spinner/Fallback-spinner';
import { OnBoardWrap } from './style';

import Login from './Login';
import Register from './RegisterEmail';
import ForgotPassword from './ForgotPassword';
import UserType from './UserType';
import VerifyEmail from './EmailVerify';
import VerifyPhone from './PhoneVerify';
import SetPassword from './SetPassword';
import RegisterPhone from './RegisterPhone';
import SetNewPassword from './SetNewPassword';
import ForgotPasswordVerification from './ForgotPasswordVerification';

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
  const renderImage = () => {
    const currentPath = window.location.pathname;
    if (
      currentPath === '/auth/set-new-password' ||
      currentPath === '/auth/set-password' ||
      currentPath === '/auth/forgot-password'
    ) {
      return <img src={CreatePWPic} alt="bg-gif" className="create-pw-pic" />;
    }
    if (
      currentPath === '/auth/phone-verify' ||
      currentPath === '/auth/email-verify' ||
      currentPath === '/auth/forgot-password-email-verify'
    ) {
      return <img src={VerificationPic} alt="bg-pic" className="verification-pic" />;
    }
    if (currentPath === '/auth/login') {
      return <img src={LoginPic} alt="bg-pic" className="me-8 login-pic" />;
    }
    if (currentPath === '/auth') {
      return <img src={UserTypePic} alt="bg-pic" className="me-8 user-type-pic" />;
    }
    return <img src={RegisterPic} alt="bg-pic" className="me-8 register-pic" />;
  };
  return (
    <OnBoardWrap>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<UserType />} />
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
        {window.innerWidth > 1024 && renderImage()}
      </Suspense>
    </OnBoardWrap>
  );
};

export default AuthRoute;
