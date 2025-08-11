// controller/notificationController.js
const notificationmodel= require('../model/notificationmodel');
const usermodel = require('../model/usermodel');


const getUserNotifications = async (req, res) => {
      
    try {
    const userId = req.user.id;

    const notifications = await notificationmodel.find({ user: userId }).sort({
      isRead: 1,       // unread first
      createdAt: -1    // newest first
    });

    res.status(200).json({ notifications });
  } catch (err) {
    console.error("❌ Error fetching notifications:", err);
    res.status(500).json({ message: 'Server error' });
  }

}



const markedasread = async(req,res)=>{
    const notificationid =req.params.id
    const userid = req.user.id
    try {
      const notification = await notificationmodel.findByIdAndUpdate({ _id: notificationid, user: userid }, { isRead: true });
      if (!notification) {
        return res.status(404).json({ message: 'Notification not found' });
      }
      res.status(200).json({ message: 'Notification marked as read' , notification });
    } catch (err) {
        console.error("❌ Error marking notification as read:", err);
        res.status(500).json({ message: 'Server error' });
    }
}

const deleteNotification = async (req, res) => {
  const notificationid = req.params.id
  const userid = req.user.id
  try{
     const notification = await notificationmodel.findByIdAndDelete({ _id: notificationid, user: userid });
     if (!notification) {
       return res.status(404).json({ message: 'Notification not found' });
     }
     res.status(200).json({ message: 'Notification deleted successfully' });
  }
  catch(err){
    console.error("❌ Error deleting notification:", err);
    res.status(500).json({ message: 'Server error' });
  }
}
module.exports = { getUserNotifications, markedasread, deleteNotification };
