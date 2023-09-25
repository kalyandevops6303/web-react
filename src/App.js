/* eslint-disable no-console */
/* eslint-disable no-undef */
import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CometChat } from '@cometchat-pro/chat';
import { toast } from 'react-hot-toast';
import { Info, X } from 'react-feather';
import { COMETCHAT_CONSTANTS } from './constants';
import { getToken, messaging, requestPermission } from './configs/api/firebase';

// ** Router Import
import Router from './router/Router';
import { setItem } from './utility/localStorageControl';
import { fcmSubscribeNotification } from './redux/actions/authActions';
import theme from './configs/themeVariables';
import { notificationCount } from './redux/reducers/notifications';

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

  const loginUser = async (authToken) => {
    await CometChat.login(authToken);
    console.log('LOGGED IN COMETCHAT');
    const fcmCometToken = await requestPermission();
    console.log('FCM TOKEN', fcmCometToken);
    await CometChat.callExtension('push-notification', 'POST', 'v2/tokens', {
      fcmToken: fcmCometToken,
    });
  };

  useEffect(() => {
    if (isLoggedIn && !fcmToken) {
      loginUser(cometAuthToken);
      let data;
      const tokenFunc = async () => {
        data = await getToken();
        if (data) {
          dispatch(fcmSubscribeNotification(data));
          // await fcmSubscribeService(data);
          setItem('fcmToken', data);
        }
        return data;
      };
      tokenFunc();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const channel = new BroadcastChannel('data-channel');
    if (channel) {
      channel?.addEventListener('message', () => {
        // Handle the received data from the service worker
        dispatch(notificationCount(true));
      });
    }

    return () => {
      // Cleanup when the component unmounts
      if (channel) {
        channel?.removeEventListener('message');
        channel?.close();
      }
    };
  }, []);
  messaging?.onMessage((payload) => {
    const notificationTitle = payload.data.message;
    console.log('PAYLOAD COMET', JSON.parse(notificationTitle));
    if (!('Notification' in window)) {
      console.warn('This browser does not support system notifications.');
    } else if (Notification.permission === 'granted') {
      // only when type single
      dispatch(notificationCount(true));

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
    }
  });
  return (
    // <React.StrictMode>
    <Suspense fallback={null}>
      <Router />
    </Suspense>
    // </React.StrictMode>
  );
};

export default App;
