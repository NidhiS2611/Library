const express = require('express')

const router = express.Router()
const authmiddle = require('../middleware/authmiddle')
const { issueBook, returnbook,deletereturedbook } = require('../controllers/issuedbookcontroller')
const { authroll } = require('../middleware/authroll')

router.post('/issuebook/:bookid',authmiddle,authroll('user'), issueBook )
router.put('/returnbook/:issuedbookid',authmiddle,authroll('user') ,returnbook )
router.delete('/deletereturnedbooks/:id', authmiddle, deletereturedbook);


module.exports = router

