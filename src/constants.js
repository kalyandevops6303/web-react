export const COMETCHAT_CONSTANTS = {
  APP_ID: import.meta.env.VITE_APP_ID,
  REGION: import.meta.env.VITE_APP_REGION,
};

export const GOOGLE_ANALYTICS_CONSTANTS = {
  TRACKING_ID: import.meta.env.GOOGLE_ANALYTICS_TRACKING_ID,
};

export const FIREBASE_CONSTANTS = {
  PUBLIC_VAPID_KEY: import.meta.env.VITE_VAPID,
  CONFIG: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  },
};
