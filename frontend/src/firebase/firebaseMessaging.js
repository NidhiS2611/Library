// src/firebaseMessaging.js
import { onMessage } from "firebase/messaging"
import { messaging } from "./Firebase";

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('Foreground Message Received: ', payload);
         if (Notification.permission === "granted") {
        new Notification(payload.notification.title, {
          body: payload.notification.body,
          icon: '/logo192.png' // public folder ka path
        });
      }
      resolve(payload);
    });
  });
