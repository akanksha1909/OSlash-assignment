exports.up = function (knex) {
    return knex.schema.createTable('session_tokens', table => {
        table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
        table.text('token').notNullable()
        table.uuid('user_id').references('id').inTable('users')
        table.timestamp('expires_at').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable('session_tokens')
}