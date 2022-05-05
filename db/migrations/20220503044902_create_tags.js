exports.up = function (knex) {
    return knex.schema.createTable('tags', table => {
        table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
        table.string('name')
        table.uuid('user_id').references('id').inTable('users')
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        table.timestamp('updated_at')
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable('tags')
}