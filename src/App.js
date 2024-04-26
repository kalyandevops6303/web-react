/* eslint-disable no-console */
/* eslint-disable no-undef */
import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CometChat } from '@cometchat-pro/chat';
import { toast } from 'react-hot-toast';
import { Info, X } from 'react-feather';

import { getToken, messaging } from './configs/api/firebase';

// ** Router Import
import Router from './router/Router';
import { getItem, setItem } from './utility/localStorageControl';
import { fcmSubscribeNotification } from './redux/actions/authActions';
import theme from './configs/themeVariables';
import { notificationCount } from './redux/reducers/notifications';
import { setUnreadMsgCount, unreadMsgCountSuccess } from './redux/reducers/chat';
import { cometChatLogin, cometloginSuccess, setLoggedInStatus } from './redux/reducers/auth';

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const fcmToken = useSelector((state) => state.auth.fcmToken);
  const cometAuthToken = useSelector((state) => state.auth.cometChatToken);
  const dispatch = useDispatch();
  // const fcmSubscribeService = (token) => DataService.post(`${API.notification.subscribe}`, { token });

  const appId = COMETCHAT_CONSTANTS.APP_ID;
  const region = COMETCHAT_CONSTANTS.REGION;
  const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();

  CometChat.init(appId, appSetting).then(
    () => {
      console.log('Initialisation successfully completed!');
    },
    (error) => {
      console.log('Initialisation failed with error:', error);
    },
  );

  const loginUser = async ({ cometToken, fcm }) => {
    await CometChat.login(cometToken);
    dispatch(cometloginSuccess());
    setItem('cometChatToken', cometToken);
    console.log('LOGGED IN COMETCHAT');
    if (fcm) {
      await CometChat.callExtension('push-notification', 'POST', 'v2/tokens', {
        fcmToken: fcm,
      });
    }
    CometChat.getUnreadMessageCountForAllUsers().then((unreadMsgs) => {
      const totalCount = Object.values(unreadMsgs).reduce((acc, count) => acc + count, 0);
      dispatch(setUnreadMsgCount(totalCount));
    });
  };

  useEffect(() => {
    if (isLoggedIn && !fcmToken) {
      let data;
      const tokenFunc = async () => {
        data = await getToken();
        if (data) {
          dispatch(fcmSubscribeNotification(data));
          loginUser({ cometToken: cometAuthToken, fcm: data });
          setItem('fcmToken', data);
        } else {
          loginUser({ cometToken: cometAuthToken });
        }
        return data;
      };
      tokenFunc();
    }
  }, [isLoggedIn, cometAuthToken, fcmToken]);

  // Fetch AccessToken and refreshToken from localstorage and check on init
  useEffect(() => {
    const accessToken = getItem('access_token');
    const refreshToken = getItem('refresh_token');
    const refreshTokenExpires = getItem('refresh_token_expires');

    // check that refreshToken is not expired
    const isUserStillLoggedIn =
      accessToken
      && refreshToken
      && refreshTokenExpires
      && new Date(refreshTokenExpires) >= new Date();

    if (isUserStillLoggedIn) {
      dispatch(setLoggedInStatus());

      const cometChatAuthToken = getItem('cometChatToken');
      dispatch(cometChatLogin(cometChatAuthToken));
    }
  },[]);

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

  messaging?.onMessage((payload) => {
    console.log('PAYLOAD COMET', payload);
    if (!('Notification' in window)) {
      console.warn('This browser does not support system notifications.');
    } else if (Notification.permission === 'granted') {
      if (payload.data.alert) {
        dispatch(unreadMsgCountSuccess());
      } else {
        // only when type single
        dispatch(notificationCount(true));
      }

      toast(
        (t) => (
          <div className="w-100 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <Info size="22" className="me-1" color={theme.primary} />
              <div className="d-flex align-items-center">
                <div>
                  <p className="mb-0 fw-bold">{payload?.data?.title}</p>
                  <small>{payload?.data?.body}</small>
                </div>
              </div>
            </div>
            <X size="14" onClick={() => toast.dismiss(t.id)} />
          </div>
        ),
        {
          style: {
            minWidth: '300px',
            border: `wpx solid ${theme.primary}`,
          },
        },
      );
    } else {
      console.log('INSIDE ELSE');
    }
  });
  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  );
};

export default App;
