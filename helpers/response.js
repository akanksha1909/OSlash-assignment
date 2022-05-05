'use strict'

class Response {
    badValues(res, message) {
        return res.status(400).json({ message })
    }

    notFound(res, type, message) {
        return res.status(404).json({
            type,
            message
        })
    }

    forbidden(res, message) {
        return res.status(403).json({ message })
    }

    success(res, data, message) {
        let responseDetails = {
            ...data,
            message
        }
        if (Array.isArray(data)) {
            responseDetails = data
        }
        return res.status(200).json(responseDetails)
    }

    noContentSuccess(res, message) {
        return res.status(204).json({ message })
    }

    errorInternal(res, error, message) {
        console.error(message, error)
        return res.status(500).json({
            type: 'UNKNOWN_ERR',
            message: 'Something went wrong. Please try again later'
        })
    }

    unauthorized(res, message) {
        return res.status(401).json({ message })
    }

    message(res, status, message) {
        return res.status(status).json({ message })
    }

    unprocessableEntity(res, type, message, errors) {
        return res.status(422).json({
            type,
            message,
            errors
        })
    }

    accepted(res) {
        return res.status(202).json({})
    }

    conflict(res, type, message) {
        return res.status(409).json({
            type,
            message
        })
    }
}

module.exports = new Response()