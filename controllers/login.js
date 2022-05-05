const _ = require('lodash')

const UserModel = require('../models/user')

const response = require('../helpers/response')
const { comparePasswordWithSecureHash, generateJwtToken } = require('../helpers/auth')

const loginHandler = async (req, res) => {
    const { email, password } = _.pick(req.body, ['email', 'password'])

    try {
        const users = await UserModel
            .query()
            .whereRaw('LOWER(??) = ?', ['users.email', `${email.toLowerCase()}`]) // case sensitive email

        const user = users[0]

        if (!user) {
            return response.notFound(res, 'Please check your email and password')
        }

        const passwordMatch = await comparePasswordWithSecureHash(password, user.password)
        if (!passwordMatch) {
            return response.notFound(res, 'Please check your email and password')
        }

        const { token, expiresAt } = generateJwtToken(res, user)
        return response.success(res, {
            token,
            expiresAt
        }, 'Login Successful')

    } catch (error) {
        console.error('Error occurred while login', error)
        return response.errorInternal(res, error, 'Something went wrong!')
    }
}

module.exports = loginHandler