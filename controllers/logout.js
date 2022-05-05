const SessionTokenModel = require('../models/session-token')

const response = require('../helpers/response')

const logoutHandler = async (req, res) => {
    const token = req.cookies?.oslashAuth ?? ''
    try {
        await SessionTokenModel.query().findOne({ token }).delete()
        res.clearCookie('oslashAuth')
        return response.success(res, {}, 'Logout Successful!')
    } catch (error) {
        console.error('Error occured while logging out', error)
        return response.errorInternal(res, error, 'Something went wrong!')
    }
}

module.exports = logoutHandler