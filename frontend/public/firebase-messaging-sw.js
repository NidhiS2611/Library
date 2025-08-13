importScripts("https://www.gstatic.com/firebasejs/10.12.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.1/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyDEjjnL8o8fCsoFEmK1OcYYtxXUdRUpWJ8",
  authDomain: "library-3390a.firebaseapp.com",
  projectId: "library-3390a",
  storageBucket: "library-3390a.appspot.com",
  messagingSenderId: "410717725920",
  appId: "1:410717725920:web:f879df68bbfa2cf72a5c85"

});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/logo192.png',
  });
});
