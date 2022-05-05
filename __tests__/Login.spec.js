const request = require('supertest')
const Knex = require('knex')

const app = require('../app')
const connection = require('../knexfile')

const knex = Knex(connection)

const loginPayload = {
    email: 'akanksha.singh@gmail.com',
    password: 'test@123'
}

const signupPayload = {
    name: 'Akanksha',
    email: 'akanksha.singh@gmail.com',
    password: 'test@123'
}

beforeAll(async () => {
    return knex.migrate.latest()
})

afterAll(() => {
    return knex.migrate.rollback()
})

beforeAll(async () => {
    return signup()
})

const signup = (credentials = signupPayload) => {
    return request(app).post('/api/signup').send(credentials)
}

const login = (credentials = loginPayload) => {
    return request(app).post('/api/login').send(credentials)
}

describe('User Login', () => {

    it('returns 200 OK when login is successful', async () => {
        const response = await login()
        expect(response.status).toBe(200)
    })

    it('sends 422 if email is null', async () => {
        const response = await login({
            email: null,
            password: 'test@123',
        })
        expect(response.status).toBe(422)
    })

    it('sends 422 if email is not valid', async () => {
        const response = await login({
            email: 'john@com',
            password: 'test@123',
        })
        const expectedMessage = 'Invalid E-mail'
        expect(response.status).toBe(422)
        expect(response.body.validationErrors['email']).toBe(expectedMessage)
    })

    it('sends 422 if password is null', async () => {
        const response = await login({
            email: 'john@doe.com',
            password: null,
        })
        expect(response.status).toBe(422)
    })

    it('returns size validation error when password is less than 5 characters', async () => {
        const response = await login({
            email: 'john@com',
            password: 'test',
        })
        const expectedMessage = 'Password should contain atleast 5 characters'
        expect(response.status).toBe(422)
        expect(response.body.validationErrors['password']).toBe(expectedMessage)
    })
})