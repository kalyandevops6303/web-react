// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js');

//Initialize the Firebase app in the service worker by passing the generated config
let firebaseConfig = {
  apiKey: 'AIzaSyDzWx2l1iq8TegujD84BYRA8WcM_x4clWU',
  authDomain: 'trumiop-testing.firebaseapp.com',
  projectId: 'trumiop-testing',
  storageBucket: 'trumiop-testing.appspot.com',
  messagingSenderId: '368642913301',
  appId: '1:368642913301:web:8e6caec720fa2b23d14a1c',
  measurementId: 'G-0G7XD1SSSR',
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

let testUrl = 'https://test.trumio.ai/';

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
  };

  self.registration.showNotification(notificationTitle).catch((error) => {
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
