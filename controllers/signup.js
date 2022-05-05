const _ = require('lodash')

const UserModel = require('../models/user')

const response = require('../helpers/response')
const { getSecureHashForPassword } = require('../helpers/auth')

const signupHandler = async (req, res) => {
    const {
        name,
        email,
        password
    } = _.pick(req.body, ['name', 'email', 'password'])

    try {
        const existingUsers = await UserModel
            .query()
            .whereRaw('LOWER(??) = ?', ['users.email', `${email.toLowerCase()}`]) // case sensitive email

        if (existingUsers.length) {
            return response.badValues(res, 'User already exists')
        }

        const userPayload = {
            name,
            email,
            password: await getSecureHashForPassword(password)
        }

        await UserModel.query().insert(userPayload)
        return response.success(res, {}, 'Signup Successful!')
    } catch (error) {
        console.error('Error occurred while signup', error)
        return response.errorInternal(res, error, 'Something went wrong!')
    }
}

module.exports = signupHandler