const path = require('path')
const config = require('config')

const { postgresDatabase } = config

module.exports = {
  client: 'postgresql',
  connection: {
    database: postgresDatabase.connection.database,
    user: postgresDatabase.connection.user,
    password: postgresDatabase.connection.password,
    host: postgresDatabase.connection.host,
    port: Number(postgresDatabase.connection.port)
  },
  pool: {
    min: Number(postgresDatabase.pool.min),
    max: Number(postgresDatabase.pool.max)
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: path.resolve(__dirname, 'db', 'migrations')
  },
  seeds: {
    directory: path.resolve(__dirname, 'db', 'seeds')
  }
}