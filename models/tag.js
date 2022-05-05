const { Model } = require('objection')

class Tag extends Model {
    static get tableName() {
        return 'tags'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name'],
            properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                user_id: { type: 'string' },
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
                    from: 'tags.user_id',
                    to: 'users.id'
                }
            }
        }
    }

    $beforeUpdate() {
        this.updated_at = new Date().toISOString()
    }
}

module.exports = Tag