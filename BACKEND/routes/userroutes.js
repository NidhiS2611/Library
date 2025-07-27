const express = require('express');
const usermodel = require('../model/usermodel');
const router = express.Router();
const { register, login, getalluser, deleteuser, returnedbook, issuedbook, logout, dashboard, updateuser, profilesummary } = require('../controllers/usercontrollers');
const authmiddle = require('../middleware/authmiddle');
const { authroll } = require('../middleware/authroll');
const upload = require('../utility/multer');

router.post('/register', register);
router.post('/login', login);


router.get('/returnedbooks', authmiddle, returnedbook);
router.get('/issuedbooks', authmiddle, issuedbook);
router.get('/me', authmiddle, async (req, res) => {
  try {
    const user = await usermodel.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/logout', authmiddle, logout);
router.patch('/updateuser', authmiddle, upload.single('profile'), updateuser);
router.get('/dashboard', authmiddle, dashboard);
router.get('/profilesummary', authmiddle, profilesummary);

module.exports = router;
