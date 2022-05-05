'use strict'

const express = require('express')

const {
    createTagHandler,
    getAllTagsHandler
} = require('../controllers/tag')

const tagRouter = express.Router()

tagRouter.use('/tags', tagRouter)

tagRouter.post('/', createTagHandler)
tagRouter.get('/', getAllTagsHandler)

module.exports = tagRouter