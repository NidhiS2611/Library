// utils/notifyNewBook.js
const notificationmodel = require('../model/notificationmodel');
const sendNotification  = require('./sendNotification');
const usermodel = require('../model/usermodel');

const notifyUsersAboutNewBook = async (bookTitle, authorName) => {
  try {
    // Step 1: Create notification in DB for all active users
    const allUsers = await usermodel.find({ isActive: true });

    for (const user of allUsers) {
    const notification =   await notificationmodel.create({
        user: user._id,
        title: "📚 New Book Added",
        body: `${bookTitle} by ${authorName}`,
        type: "book",
        isRead: false,
        createdAt: new Date()
      });
      console.log(`Notification created for user ${user._id}: ${notification._id}`);
    }
    
    

    // Step 2: Send push notification only to eligible users
    const pushUsers = await usermodel.find({
      isActive: true,
      fcmToken: { $nin: [null, ""] },
      'notificationPreferences.method.push': true,
      'notificationPreferences.triggers.newBook': true
    });

 c

    console.log("✅ Notifications created and sent successfully");

  } catch (error) {
    console.error("❌ Error in notifying users about new book:", error);
  }
};

module.exports = notifyUsersAboutNewBook;
