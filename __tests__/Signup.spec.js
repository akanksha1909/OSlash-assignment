const request = require('supertest')
const Knex = require('knex')

const app = require('../app')
const connection = require('../knexfile')

const knex = Knex(connection)

const signupPayload = {
    name: 'john',
    email: 'john@doe.com',
    password: 'test@123'
}

const signup = (credentials = signupPayload) => {
    return request(app).post('/api/signup').send(credentials)
}

beforeAll(() => {
    return knex.migrate.latest()
})

afterAll(() => {
    return knex.migrate.rollback()
})

describe('User Signup', () => {

    it('returns 200 OK when signup is successful', async () => {
        const response = await signup()
        expect(response.status).toBe(200)
    })

    it('sends 422 if name is null', async () => {
        const response = await signup({
            name: null,
            email: 'john@doe.com',
            password: 'test@123',
        })
        expect(response.status).toBe(422)
    })

    it('sends 422 if email is null', async () => {
        const response = await signup({
            name: 'john',
            email: null,
            password: 'test@123',
        })
        expect(response.status).toBe(422)
    })

    it('sends 422 if email is not valid', async () => {
        const response = await signup({
            name: 'john',
            email: 'john@com',
            password: 'test@123',
        })
        const expectedMessage = 'Invalid E-mail'
        expect(response.status).toBe(422)
        expect(response.body.validationErrors['email']).toBe(expectedMessage)
    })

    it('sends 422 if password is null', async () => {
        const response = await signup({
            name: 'john',
            email: 'john@doe.com',
            password: null,
        })
        expect(response.status).toBe(422)
    })

    it('returns size validation error when password is less than 5 characters', async () => {
        const response = await signup({
            name: 'john',
            email: 'john@g.com',
            password: 'test',
        })
        const expectedMessage = 'Password should contain atleast 5 characters'
        expect(response.status).toBe(422)
        expect(response.body.validationErrors['password']).toBe(expectedMessage)
    })
})