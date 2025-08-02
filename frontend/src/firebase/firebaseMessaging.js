// src/firebaseMessaging.js
import { onMessage } from "firebase/messaging"
import { messaging } from "./Firebase";

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('Foreground Message Received: ', payload);
      resolve(payload);
    });
  });
