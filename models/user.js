const { Model } = require('objection')

class User extends Model {
    static get tableName() {
        return 'users'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'email', 'password'],
            properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                email: { type: 'string' },
                password: {
                    oneOf: [
                        { type: 'string' },
                        { type: 'null' }
                    ]
                },
                created_at: { type: 'string' },
                updated_at: { type: 'string' }
            }
        }
    }

    static get relationMappings() {
        const Shortcut = require('./shortcut')
        const Tag = require('./tag')

        return {
            shortcuts: {
                relation: Model.HasManyRelation,
                modelClass: Shortcut,
                join: {
                    from: 'users.id',
                    to: 'shortcuts.user_id'
                }
            },
            tags: {
                relation: Model.HasManyRelation,
                modelClass: Tag,
                join: {
                    from: 'users.id',
                    to: 'tags.user_id'
                }
            }
        }
    }

    $beforeUpdate() {
        this.updated_at = new Date().toISOString()
    }
}

module.exports = User