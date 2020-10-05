importScripts('https://www.gstatic.com/firebasejs/7.22.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.22.0/firebase-messaging.js');

const firebaseConf = {
  apiKey: "AIzaSyDmW-zt_s96mfkQhU5R26Q9H1UrVsA-GcA",
  projectId: "locker-db7b0",
  messagingSenderId: "1028008017896",
  appId: "1:1028008017896:web:2e97eeb079938636e02e5d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConf);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  const notificationTitle = 'Walcron order ready!';
  const notificationOptions = {
    body: JSON.stringify(payload),
    icon: '/pwa/android-icon-144x144.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

//Notification click is handled with fcm options.
