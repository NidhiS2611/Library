import { getToken } from "firebase/messaging";
import axios from "axios";

// ✅ import `messaging` from your initialized Firebase
import { messaging } from "./Firebase"; // make sure path is correct

export const requestPermissionAndGetToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BPtbmFjtrzhyWouhVVJhDW8IaruZDUDzklSDjd8r7MGsHR_89K596kyx33nLv_XkWKuomHZJfUr-bUl-NMf4Ad8"
      });

      console.log("✅ User FCM Token:", token);

      // Send token to backend
      await axios.post('https://librarymanagement-81b2.onrender.com/user/save-token', { token }, { withCredentials: true });

    } else {
      console.warn("❌ Notification permission not granted");
    }
  } catch (err) {
    console.error("❌ Error getting permission or token", err);
  }
};

