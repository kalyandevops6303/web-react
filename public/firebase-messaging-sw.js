// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js');

//Initialize the Firebase app in the service worker by passing the generated config
let firebaseConfig = {
  apiKey: 'AIzaSyCFjJUyT_4xUUc1sOmj54MHnahvgAor-rU',
  authDomain: 'trumio-inc.firebaseapp.com',
  projectId: 'trumio-inc',
  storageBucket: 'trumio-inc.appspot.com',
  messagingSenderId: '1079858550340',
  appId: '1:1079858550340:web:22dc530ee7dff738274e11',
  measurementId: 'G-N0QV5ZFL2L',
};
firebase.initializeApp(firebaseConfig);

class CustomPushEvent extends Event {
  constructor(data) {
    super('push');

    Object.assign(this, data);
    this.custom = true;
  }
}

/*
 * Overrides push notification data, to avoid having 'notification' key and firebase blocking
 * the message handler from being called
 */

const channel = new BroadcastChannel('data-channel');

self.addEventListener('push', (e) => {
  // Skip if event is our own custom event
  if (e.custom) return;

  // Kep old event data to override
  const oldData = e.data;

  // Create a new event to dispatch, pull values from notification key and put it in data key,
  // and then remove notification key
  const newEvent = new CustomPushEvent({
    data: {
      ehheh: oldData.json(),
      json() {
        const newData = oldData.json();
        newData.data = {
          ...newData.data,
          ...newData.notification,
        };
        delete newData.notification;
        return newData;
      },
    },
    waitUntil: e.waitUntil.bind(e),
  });

  // Stop event propagation
  e.stopImmediatePropagation();

  // Dispatch the new wrapped event
  dispatchEvent(newEvent);
});

const messaging = firebase.messaging();

let testUrl = 'https://prod-app.trumio.ai/';

messaging.onBackgroundMessage((payload) => {
  const { data } = payload;

  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = data?.title;
  const notificationOptions = {
    body: data?.body,
    icon: '/firebase-logo.png',
  };

  channel.postMessage(payload);

  self.registration.showNotification(notificationTitle, notificationOptions).catch((error) => {
    console.error('Error displaying notification:', error);
  });
});

self.addEventListener('notificationclick', (event) => {
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowCLients) => {
      for (var i = 0; i < windowCLients.length; i++) {
        var client = windowCLients[i];
        if ('focus' in client && client.url.includes(testUrl)) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(testUrl);
      }
    }),
  );
});
