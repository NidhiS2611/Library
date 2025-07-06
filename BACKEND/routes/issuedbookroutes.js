const express = require('express')

const router = express.Router()
const authmiddle = require('../middleware/authmiddle')
const { issueBook, returnbook } = require('../controllers/issuedbookcontroller')
const { authroll } = require('../middleware/authroll')

router.post('/issuebook/:bookid',authmiddle,authroll('user'), issueBook )
router.put('/returnbook/:issuedbookid',authmiddle,authroll('user') ,returnbook )

module.exports = router

