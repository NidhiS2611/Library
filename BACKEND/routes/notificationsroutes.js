const express = require('express');
const router = express.Router();
const { getUserNotifications, markedasread ,deleteNotification} = require('../controllers/notificationcontroller');
const authmiddle = require('../middleware/authmiddle');


router.get('/getnotifications', authmiddle, getUserNotifications);
router.put('/user/:id/mark-as-read', authmiddle, markedasread);
router.delete('/user/:id/delete', authmiddle, deleteNotification);

module.exports = router;
