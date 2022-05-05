const express = require('express')

const logoutHandler = require('../controllers/logout')

const router = express.Router()

router.post('/logout', logoutHandler)

module.exports = router