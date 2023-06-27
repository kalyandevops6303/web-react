/* eslint-disable no-undef */
/* eslint-disable no-console */
import firebase from 'firebase/app';
import 'firebase/messaging';
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
});

export const messaging = firebase.messaging.isSupported() ? firebase.messaging() : null;
const { VITE_VAPID } = import.meta.env;
const publicKey = VITE_VAPID;

export const getToken = async () => {
  let currentToken = '';
  try {
    await Notification.requestPermission()
      .then(async () => {
        currentToken = await messaging?.getToken({ vapidKey: publicKey });
      })
      .catch((error) => {
        console.error(error, 'from firebase..');
      });
  } catch (error) {
    console.error('error', error);
  }

  return currentToken;
};

export const onMessageListner = async () => {
  const payloadData = await messaging?.onMessage((payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.icon,
    };

    if (!('Notification' in window)) {
      console.error('This browser does not support system notifications.');
    } else if (Notification.permission === 'granted') {
      // If it's okay let's create a notification
      const notification = new Notification(notificationTitle, notificationOptions);
      notification.onclick = (event) => {
        event.preventDefault();
        window.open(payload.notification.click_action, '_blank');
        notification.close();
      };
    }
    return payload;
  });
  let message = null;
  message = await payloadData();
  return message;
};
