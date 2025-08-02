import { useEffect } from "react";
import { onMessageListener } from '../firebase/firebaseMessaging'; // correct path lagana

const NotificationListener = () => {
  useEffect(() => {
    onMessageListener()
      .then((payload) => {
        const { title, body } = payload.notification;

        // Check permission and show browser notification
        if (Notification.permission === "granted") {
          new Notification(title, {
            body,
            icon: "/logo192.png", // optional
          });
        }
      })
      .catch(err => console.log('Notification Error: ', err));
  }, []);

  return null; // invisible component
};

export default NotificationListener;
