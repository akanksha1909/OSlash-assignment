exports.up = function (knex) {
    return knex.schema.createTable('users', table => {
        table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
        table.string('name')
        table.string('email').unique().notNullable()
        table.string('password')
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        table.timestamp('updated_at')
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable('users')
}  