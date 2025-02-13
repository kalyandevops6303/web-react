/* eslint-disable no-else-return */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken as getMessagingToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const messaging = 'Notification' in window ? getMessaging(app) : null;
const { VITE_VAPID } = import.meta.env;
const publicKey = VITE_VAPID;

export const getToken = async () => {
  let currentToken = '';
  try {
    await Notification.requestPermission()
      .then(async () => {
        if (messaging) {
          currentToken = await getMessagingToken(messaging, { vapidKey: publicKey });
        }
      })
      .catch((error) => {
        console.log(error, 'from firebase..');
      });
  } catch (error) {
    console.log('error', error);
  }

  return currentToken;
};

export const requestPermission = () =>
  new Promise((resolve) => {
    console.log('Requesting User Permission......');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification User Permission Granted.');
        if (messaging) {
          getMessagingToken(messaging, { vapidKey: publicKey })
            .then((currentToken) => {
              if (currentToken) {
                resolve(currentToken);
              } else {
                console.log('Failed to generate the app registration token.');
              }
            })
            .catch((err) => {
              console.log('An error occurred when requesting to receive the token.', err);
            });
        }
      } else {
        console.log('User Permission Denied.');
      }
    });
  });

export const onMessageListner = async () => {
  if (!messaging) return null;

  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon,
      };

      if (!('Notification' in window)) {
        console.error('This browser does not support system notifications.');
      } else if (Notification.permission === 'granted') {
        const notification = new Notification(notificationTitle, notificationOptions);
        notification.onclick = (event) => {
          event.preventDefault();
          window.open(payload.notification.click_action, '_blank');
          notification.close();
        };
      }
      resolve(payload);
    });
  });
};
