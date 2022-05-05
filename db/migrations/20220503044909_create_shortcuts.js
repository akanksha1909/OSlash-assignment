exports.up = function (knex) {
    return knex.schema.createTable('shortcuts', table => {
        table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
        table.string('shortlink')
        table.string('url')
        table.text('description')
        table.uuid('user_id').references('id').inTable('users')
        table.jsonb('tags').defaultTo([])
        table.boolean('is_deleted').defaultTo(false).notNullable()
        table.timestamp('deleted_at')
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        table.timestamp('updated_at')
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable('shortcuts')
}