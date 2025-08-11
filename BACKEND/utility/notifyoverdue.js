

const notificationmodel =  require('../model/notificationmodel')
const sendNotification = require('./sendNotification');
const usermodel = require('../model/usermodel');
const bookmodel = require('../model/bookmodel'); // optional
const issuedbookmodel = require('../model/issuedbookmodel'); // assuming schema name
const { sendMail } = require('../service/mail');

const notifyUsersAboutOverdueBooks = async () => {
    try {
        const today = new Date();

        // ✅ Step 1: Find all overdue books
        const overdueBooks = await issuedbookmodel.find({
            returnDate: { $lt: today },
            isreturned: false // assuming a 'returned' field
        }).populate('user book')
        //  console.log('Overdue books found:', overdueBooks);

        if (!overdueBooks.length) return;
        
        for (const record of overdueBooks) {
            const user = record.user;
            const book = record.book;
            
            
            if(!user || !book) {
                console.warn("❗ User or Book not found for overdue record:", record);
                continue;
            }
            console.log(`📚 Notifying user ${user.name} about overdue book "${book.title}"`);

            if (
                user?.isActive &&
                user.fcmToken &&
                user.notificationPreferences?.method?.push &&
                user.notificationPreferences?.triggers?.overdue
            ) {
                // ✅ Create notification
                const notification = await notificationmodel.create({
                    user: user._id,
                    title: "📕 Overdue Alert",
                    body: `Your book "${book.title}" is overdue. Please return it ASAP.`,
                    type: "overdue",
                    isRead: false,
                    isPushEligible: true,
                    createdAt: new Date(),
                });

                // ✅ Send push notification
                await sendNotification(
                    user.fcmToken,
                    "📕 Overdue Book Alert",
                    `Your book "${book.title}" is overdue. Please return it.`
                );

        
            }

            if (
                user.isActive &&
                user.email &&
                user.notificationPreferences?.method?.email &&
                user.notificationPreferences?.triggers?.overdue
            ) {
                await sendMail(user.email, "overdue", book.title, book.author);
                
            }
        }



 console.log(`✅ Overdue notifications sent`);

    } catch (error) {
        console.error("❌ Error notifying users about overdue books:", error);
    }
};


module.exports = notifyUsersAboutOverdueBooks
