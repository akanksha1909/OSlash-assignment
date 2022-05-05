'use strict'

const express = require('express')

const {
    createShortcutHandler,
    getAllShortcutsHandler,
    deleteShortcutHandler
} = require('../controllers/shortcut')

const shortcutRouter = express.Router()

shortcutRouter.use('/shortcuts', shortcutRouter)

shortcutRouter.post('/', createShortcutHandler)
shortcutRouter.get('/', getAllShortcutsHandler)
shortcutRouter.delete('/:shortcut_id', deleteShortcutHandler)

module.exports = shortcutRouter