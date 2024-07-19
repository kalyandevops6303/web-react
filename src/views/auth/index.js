/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPic from '@src/assets/images/auth/loginpic.png';
import { useSelector } from 'react-redux';
import ClientPic from '@src/assets/images/auth/clientImage.png';
import CreatePWPic from '@src/assets/images/auth/createPasswordImg.png';
import WelcomePic from '@src/assets/images/auth/welcomepic.png';
import VerificationPic from '@src/assets/images/auth/verificationImage.png';
import TalentPic from '@src/assets/images/auth/talentImage.png';

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
import { selectUserType } from '../../redux/selectors/authSelectors';
import { userTypes } from '../../utility/constants/Constant';
import RegisterDelegate from './RegisterDelegate';

const AuthRoute = () => {
  const userType = useSelector(selectUserType);
  const routes = [
    {
      path: '/login/:token',
      element: <Login />,
    },
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
      path: '/register-delegate',
      element: <RegisterDelegate />,
    },
    {
      path: '/register-phone',
      element: <RegisterPhone />,
    },
    {
      path: '/register-delegate-phone',
      element: <RegisterPhone isDelegate />,
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
      currentPath === '/auth/forgot-password-email-verify' ||
      currentPath === '/auth/register-delegate-phone'
    ) {
      return <img src={VerificationPic} alt="bg-pic" className="verification-pic" />;
    }
    if (currentPath === '/auth/login') {
      return <img src={LoginPic} alt="bg-pic" className="me-8 login-pic" />;
    }
    if (userType === userTypes.client || currentPath === '/auth/register-delegate') {
      return <img src={ClientPic} alt="bg-pic" className="me-8 client-pic" />;
    }
    if (userType === userTypes?.talent) {
      return <img src={TalentPic} alt="bg-pic" className="verification-pic" />;
    }
    return <img src={WelcomePic} alt="bg-pic" className="me-8 welcome-pic" />;
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

        <div className="w-100">{window.innerWidth > 1024 && renderImage()}</div>
      </Suspense>
    </OnBoardWrap>
  );
};

export default AuthRoute;
