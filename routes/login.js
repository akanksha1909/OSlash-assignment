const express = require('express')
const validator = require('express-validator')

const loginHandler = require('../controllers/login')

const validationErrorMiddleware = require('../middlewares/validation-error')

const router = express.Router()

const validationMiddleware = validator.checkSchema({
    email: {
        in: 'body',
        isEmail: {
            errorMessage: 'Invalid E-mail'
        },
        trim: true
    },
    password: {
        in: 'body',
        isLength: {
            errorMessage: 'Password should contain atleast 5 characters',
            options: { min: 5 }
        },
        trim: true
    }
})

const middlewares = [validationMiddleware, validationErrorMiddleware]

router.post('/login', middlewares, loginHandler)

module.exports = router