const _ = require('lodash')

const UserModel = require('../models/user')

const response = require('../helpers/response')

const DEFAULT_TAGS_LIMIT = 10
const DEFAULT_OFFSET = 0
const MAX_TAGS_LIMIT = 50

const createTagHandler = async (req, res) => {
    const { id: userId } = req.user
    const { name } = _.pick(req.body, ['name'])
    try {
        const user = await UserModel.query().findById(userId)
        const existingTags = await user.$relatedQuery('tags').where({ name })

        if (existingTags.length) {
            return response.badValues(res, 'Tag already exists.')
        }
        const tag = await user.$relatedQuery('tags').insert({ name })
        return response.success(res, tag, 'Created Tag Successfully')
    } catch (error) {
        console.error('Error occurred while creating a tag', error)
        return response.errorInternal(res, error, 'Something went wrong!')
    }
}

const getAllTagsHandler = async (req, res) => {
    const { id: userId } = req.user
    const { offset = DEFAULT_OFFSET, limit = DEFAULT_TAGS_LIMIT } = req.query
    const tagsLimit = Math.min(MAX_TAGS_LIMIT, limit)

    try {
        const tags = await UserModel
            .relatedQuery('tags')
            .for(userId)
            .select('id', 'name', 'created_at')
            .orderBy('created_at', 'DESC')
            .offset(offset)
            .limit(tagsLimit)
            .range()

        return response.success(res, {
            results: tags.results,
            meta: {
                total: tags.total,
                offset,
                limit: tagsLimit
            }
        })
    } catch (error) {
        console.error('Error occurred while listing tags created by user', error)
        return response.errorInternal(res, error, 'Something went wrong!')
    }
}

module.exports = {
    createTagHandler,
    getAllTagsHandler
}