'use strict'

const { validationResult } = require('express-validator')
const response = require('../helpers/response')

function validator(req, res, next) {
    const validationErrors = {}
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            validationErrors[error.param] = error.msg
        })
        return res.status(422).send({ validationErrors })
    }
    next()
}

module.exports = validator