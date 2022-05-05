module.exports = {
    session: {
        jwtSecret: '' // <uuid or any string combination of characters used to encrypt and decrypy jwt tokens
    },
    postgresDatabase: {
        connection: {
            database: '', // Database name
            user: '', // User name
            password: '', // Password for Database connection
            host: '', // Host for connecting Database
            port: '5432' // Port for connectiong Database
        },
        pool: {
            min: '3', // min connection pool for Database
            max: '10' // max xonnection pool for Database
        }
    }
}