/* eslint-disable no-else-return */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import { initializeApp } from 'firebase/app';
import {
  getMessaging,
  getToken as getMessagingToken,
  onMessage,
  MessagePayload,
  NotificationPayload,
} from 'firebase/messaging';

/**
 * Interface for Firebase configuration.
 */
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

/**
 * Initialize Firebase with environment variables.
 */
const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

/**
 * Initialize messaging only if supported by the browser.
 */
export const messaging = getMessaging(app);
const { VITE_VAPID } = import.meta.env;
const publicKey = VITE_VAPID;

/**
 * Retrieves the Firebase Cloud Messaging token.
 */
export const getToken = async (): Promise<string> => {
  try {
    if (!messaging) throw new Error('Messaging not initialized or not supported.');
    await Notification.requestPermission();
    return await getMessagingToken(messaging, { vapidKey: publicKey });
  } catch (error) {
    console.error('Error retrieving token:', error);
    return '';
  }
};

/**
 * Requests notification permission and retrieves the FCM token.
 */
export const requestPermission = async (): Promise<string> => {
  try {
    console.log('Requesting User Permission...');
    const permission = await Notification.requestPermission();

    if (permission === 'granted' && messaging) {
      console.log(messaging, permission);
      console.log(await getMessagingToken(messaging, { vapidKey: publicKey }));
      return await getMessagingToken(messaging, { vapidKey: publicKey });
    }
    throw new Error('Notification permission denied.');
  } catch (error) {
    console.error('Error getting token:', error);
    throw error;
  }
};

/**
 * Sets up a listener for Firebase Cloud Messaging.
 */
export const onMessageListener = async (): Promise<MessagePayload | null> => {
  if (!messaging) return null;

  return new Promise((resolve) => {
    onMessage(
      messaging,
      (payload: MessagePayload & { notification?: NotificationPayload & { click_action?: string } }) => {
        if (payload.notification) {
          const { title = '', body = '', icon = '', click_action } = payload.notification;

          const notification = new Notification(title, { body, icon });
          notification.onclick = (event) => {
            event.preventDefault();
            if (click_action) {
              window.open(click_action, '_blank');
            }
            notification.close();
          };
        }
        resolve(payload);
      },
    );
  });
};
