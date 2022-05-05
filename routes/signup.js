const express = require('express')
const validator = require('express-validator')

const signupHandler = require('../controllers/signup')

const validationErrorMiddleware = require('../middlewares/validation-error')

const router = express.Router()

const validationMiddleware = validator.checkSchema({
    name: {
        in: 'body',
        isString: {
            errorMessage: 'Name must be a string'
        },
        trim: true
    },
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

router.post('/signup', middlewares, signupHandler)

module.exports = router