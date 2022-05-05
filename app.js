const express = require('express')
const { json } = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

app.use(json())
app.use(cookieParser())

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message })
})

module.exports = app