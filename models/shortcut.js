const { Model } = require('objection')

class Shortcut extends Model {
    static get tableName() {
        return 'shortcuts'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['shortlink', 'url'],
            properties: {
                id: { type: 'string' },
                shortlink: { type: 'string' },
                url: { type: 'string' },
                user_id: { type: 'string' },
                tags: { type: 'array' },
                is_deleted: { type: 'boolean' },
                deleted_at: { type: 'string' },
                created_at: { type: 'string' },
                updated_at: { type: 'string' }
            }
        }
    }

    static get relationMappings() {
        const User = require('./user')
        return {
            users: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'shortcuts.user_id',
                    to: 'users.id'
                }
            }
        }
    }

    $beforeUpdate() {
        this.updated_at = new Date().toISOString()
    }
}

module.exports = Shortcut