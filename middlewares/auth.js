const jwt = require('jsonwebtoken')
const config = require('config')

const SessionTokenModel = require('../models/session-token')
const UserModel = require('../models/user')

const response = require('../helpers/response')

const authMiddleware = async (req, res, next) => {
    const token = req.cookies?.oslashAuth ?? ''

    try {
        if (!token) {
            return response.unauthorized(res, 'User Not authenticated')
        }

        const session = await SessionTokenModel.query().findOne({ token })

        if (!session) {
            return response.unauthorized(res, 'User Not authenticated')
        }

        const jwtSecret = config.get('session.jwtSecret')

        const decrypt = jwt.verify(token, jwtSecret)
        const { id: userId, email } = decrypt

        const user = await UserModel.query().findById(userId)

        if (!user) {
            return response.unauthorized(res, 'User Not authenticated')
        }

        req.user = {
            id: userId,
            email
        }
        next()
    } catch (error) {
        return response.errorInternal(res, error, 'Something went wrong!')
    }
}

module.exports = authMiddleware