const cronjob = require('node-cron');
const notifyUsersAboutOverdueBooks=  require('./utility/notifyoverdue')
  cronjob.schedule('0 9 * * * ', async () => {
    try{
          console.log('Running cron job to notify users about overdue books');

    await notifyUsersAboutOverdueBooks();
    } catch (error) {
        console.error("❌ Error occurred while notifying users about overdue books:", error);
    }

  });