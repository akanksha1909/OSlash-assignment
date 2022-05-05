const express = require('express')

const authMiddleware = require('../middlewares/auth')

const shortcutRoute = require('./shortcutRoutes')
const tagRoute = require('./tagRoutes')
const logoutRoute = require('./logout')

const router = express.Router()

router.use(shortcutRoute)
router.use(tagRoute)
router.use(logoutRoute)

const authorizedRouter = express.Router()
authorizedRouter.use(authMiddleware, router)

module.exports = authorizedRouter