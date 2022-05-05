const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')
const moment = require('moment')

const isDevelopment = process.env.NODE_ENV === 'development'

/**
 * This method generates a hash for the password sent using `bcrypt` algorithm
 * No. of rounds used to generate hash = 2^10 = 1024.
 *
 * @param  {string} password
 *
 * @return {Promise<string>} Promise [resolves to string: passwordHash]
 */
const getSecureHashForPassword = password => bcrypt.hash(password, 10)

/**
 * This method compares the password and secure hash passed, to check if it matches.
 *
 * @param  {string} password
 * @param  {string} hash
 *
 * @returns {Promise<boolean>} Promise [resolves to boolean: true/ false]
 */
const comparePasswordWithSecureHash = (password, hash) => bcrypt.compare(password, hash)

/**
 * Generates a jwt token for authentication
 *
 * @param  {object} res Express response object
 * @param  {object} user user object (must contain id, accountId, email)
 * @param  {object} options options for token generation
 *
 * @returns {object} returns an object with token and expiry time
 */
const generateJwtToken = (res, user = {}, options = {}) => {
    const jwtSecret = config.get('session.jwtSecret')

    const expiresIn = moment.duration(1, 'd').asMilliseconds() // 1 day

    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
        expiresIn
    })

    const expiresAt = new Date(Date.now() + expiresIn)
    const cookieOptions = {
        expires: expiresAt,
        secure: !isDevelopment,
        httpOnly: true,
        sameSite: 'strict'
    }

    res.cookie('oslashAuth', token, cookieOptions)

    return {
        token,
        expiresAt: expiresAt.toISOString()
    }
}

module.exports = {
    getSecureHashForPassword,
    comparePasswordWithSecureHash,
    generateJwtToken
}
