/* eslint-disable no-console */
/* eslint-disable no-undef */
import React, { Suspense, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Info, X } from 'react-feather';
import Hotjar from '@hotjar/browser';
import { getToken, onMessageListener } from './configs/api/firebase';
import Router from './router/Router';
import { getItem, setItem } from './utility/localStorageControl';
import theme from './configs/themeVariables';
import { notificationCount } from './redux/reducers/notifications';
import { setLoggedInStatus } from './redux/reducers/auth';
import './App.css';
import { checkPoints } from './utility/constants/Constant';
import { HOTJAR_ANALYTICS_CONSTANTS } from './constants';
import { isUserLoggedIn } from './utility/commonUtils';
import { getAppPermissions } from './redux/actions/authActions';

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const fcmToken = useSelector((state) => state.auth.fcmToken);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const location = useLocation();
  // const fcmSubscribeService = (token) => DataService.post(`${API.notification.subscribe}`, { token });

  const siteId = HOTJAR_ANALYTICS_CONSTANTS.TRACKING_ID;
  const hotjarVersion = 6;
  Hotjar.init(siteId, hotjarVersion);

  useEffect(() => {
    if (isUserLoggedIn()) {
      dispatch(getAppPermissions());
    }
  }, []);

  const tokenFunc = useCallback(async () => {
    if (isLoggedIn && !fcmToken) {
      const data = await getToken();
      if (data) {
        setItem('fcmToken', data);
      }
    }
  }, [dispatch, isLoggedIn, fcmToken]);

  useEffect(() => {
    if (isLoggedIn && !fcmToken) {
      tokenFunc();
    }
  }, [isLoggedIn, fcmToken]);

  // Fetch AccessToken and refreshToken from localstorage and check on init
  useEffect(() => {
    const refreshTokenExpires = getItem('refresh_token_expires');

    // check that refreshToken is not expired
    const isUserStillLoggedIn = isUserLoggedIn() && refreshTokenExpires && new Date(refreshTokenExpires) >= new Date();

    if (
      isUserStillLoggedIn &&
      (userData?.checkpoint === checkPoints.PROFILE_DETAILS || userData?.checkpoint === checkPoints.COMPLETE)
    ) {
      dispatch(setLoggedInStatus());
    }
  }, []);

  useEffect(() => {
    const channel = new BroadcastChannel('data-channel');
    if (channel) {
      channel?.addEventListener('message', (event) => {
        // Handle the received data from the service worker
        const { data } = event;

        if (data?.data?.alert) {
          dispatch(unreadMsgCountSuccess());
        } else {
          dispatch(notificationCount(true));
        }
      });
    }

    return () => {
      // Cleanup when the component unmounts
      if (channel) {
        channel?.removeEventListener('message', () => {});
        channel?.close();
      }
    };
  }, []);

  useEffect(() => {
    onMessageListener().then((payload) => {
      if (location.pathname !== '/notifications') {
        if (payload?.data?.alert) {
          dispatch(unreadMsgCountSuccess());
        } else {
          dispatch(notificationCount(true));
        }

        toast(
          (t) => (
            <div className="w-100 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <Info size="22" className="me-1" color={theme.primary} />
                <div className="d-flex align-items-center">
                  <p className="fw-bolder mb-0">{payload?.data?.title} -&nbsp;</p>
                  <p className="fw-bold mb-0">{payload?.data?.body}</p>
                </div>
              </div>
              <X size="14" onClick={() => toast.dismiss(t.id)} />
            </div>
          ),
          {
            style: {
              background: theme.toastBacgroundColor,
              borderLeft: `4px solid ${theme.toastBorderColor}`,
              maxWidth: '100%',
              width: '100%',
              color: theme.toastBorderColor,
            },
          },
        );
      }
    });
  }, [location.pathname]);

  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  );
};

export default App;
