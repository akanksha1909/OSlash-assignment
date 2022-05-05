const express = require('express')
const { json } = require('body-parser')
const { Model } = require('objection')
const cookieParser = require('cookie-parser')
const Knex = require('knex')

const connection = require('./knexfile')

const knexConnection = Knex(connection)
Model.knex(knexConnection)

const signupRoute = require('./routes/signup')
const loginRoute = require('./routes/login')
const protectedRoutes = require('./routes/protectedRoutes')

const app = express()

app.use(json())
app.use(cookieParser())

app.use('/api', signupRoute)
app.use('/api', loginRoute)
app.use('/api', protectedRoutes)

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message })
})

module.exports = app