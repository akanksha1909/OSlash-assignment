const { Model } = require('objection')

class SessionToken extends Model {
    static get tableName() {
        return 'session_tokens'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['token', 'expires_at'],
            properties: {
                id: { type: 'string' },
                user_id: { type: 'string' },
                token: { type: 'string' },
                expires_at: { type: 'string' },
                created_at: { type: 'string' }
            }
        }
    }

    static get relationMappings() {
        const User = require('./user')
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'session_tokens.user_id',
                    to: 'users.id'
                }
            }
        }
    }
}

module.exports = SessionToken