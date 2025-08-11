const notificationmodel = require('../model/notificationmodel');
const sendNotification = require('./sendNotification');
const usermodel = require('../model/usermodel');
const { sendMail } = require('../service/mail'); // ✅ email service

const notifyUsersAboutNewBook = async (bookTitle, authorName) => {
  try {
    // ✅ Step 1: Find all users who are eligible for push or email
    const users = await usermodel.find({
      isActive: true,
      $or: [
        {
          fcmToken: { $nin: [null, ""] },
          'notificationPreferences.method.push': true,
          'notificationPreferences.triggers.newBook': true,
        },
        {
          email: { $ne: null },
          'notificationPreferences.method.email': true,
          'notificationPreferences.triggers.newBook': true,
        }
      ]
    });

    for (const user of users) {
      const allowPush = user.fcmToken &&
        user.notificationPreferences?.method?.push &&
        user.notificationPreferences?.triggers?.newBook;

      const allowEmail = user.email &&
        user.notificationPreferences?.method?.email &&
        user.notificationPreferences?.triggers?.newBook;

      // ✅ Push Notification
      if (allowPush) {
        await notificationmodel.create({
          user: user._id,
          title: "📚 New Book Added",
          body: `${bookTitle} by ${authorName}`,
          type: "book",
          isRead: false,
          isPushEligible: true,
          createdAt: new Date(),
        });

        await sendNotification(
          user.fcmToken,
          "📚 New Book Added",
          `${bookTitle} by ${authorName}`
        );

        console.log(`📲 Push sent to ${user.name}`);
      }

      // ✅ Email Notification
      if (allowEmail) {
        await sendMail(user.email, 'newBook', bookTitle, authorName);
        console.log(`📧 Email sent to ${user.email}`);
      }
    }

    console.log("✅ Notifications (push + email) sent to all eligible users");

  } catch (error) {
    console.error("❌ Error in notifying users about new book:", error);
  }
};

module.exports = notifyUsersAboutNewBook;

  
