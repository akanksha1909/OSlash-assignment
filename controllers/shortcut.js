const _ = require('lodash')

const UserModel = require('../models/user')

const response = require('../helpers/response')

const DEFAULT_SHORTCUTS_LIMIT = 10
const DEFAULT_OFFSET = 0
const MAX_SHORTCUTS_LIMIT = 50
const DEFAULT_SORT = 'created_at'
const DEFAULT_ORDER = 'desc'

const createShortcutHandler = async (req, res) => {
    const { id: userId } = req.user
    const { shortlink, url, tags, description } = _.pick(req.body, ['shortlink', 'url', 'tags', 'description'])
    try {
        const user = await UserModel.query().findById(userId)
        const existingShortcuts = await user
            .$relatedQuery('shortcuts')
            .whereRaw('LOWER(??) = ?', ['shortcuts.shortlink', `${shortlink.toLowerCase()}`])

        if (existingShortcuts.length) {
            return response.badValues(res, 'Shortcut already exists. Please use different shortlink name.')
        }

        await user.$relatedQuery('shortcuts').insert({
            shortlink,
            url,
            tags,
            description
        })
        return response.success(res, {}, 'Shortcut for a link successfully created.')
    } catch (error) {
        console.error('Error occurred while creating shortcut link for a user', error)
        return response.errorInternal(res, error, 'Something went wrong!')
    }
}

const getAllShortcutsHandler = async (req, res) => {
    const { id: userId } = req.user
    const {
        offset = DEFAULT_OFFSET,
        limit = DEFAULT_SHORTCUTS_LIMIT,
        sort_by = DEFAULT_SORT,
        order_by = DEFAULT_ORDER,
        search = ''
    } = req.query
    const shortcutsLimit = Math.min(MAX_SHORTCUTS_LIMIT, limit)

    try {
        const shortcuts = await UserModel
            .relatedQuery('shortcuts')
            .for(userId)
            .select('id', 'shortlink', 'url', 'tags', 'description', 'created_at')
            .where('shortlink', 'ilike', `%${search}%`)
            .orWhere('description', 'ilike', `%${search}%`)
            .orderBy(sort_by, order_by)
            .offset(offset)
            .limit(shortcutsLimit)
            .range()

        return response.success(res, {
            results: shortcuts.results,
            meta: {
                total: shortcuts.total,
                offset,
                limit: shortcutsLimit
            }
        })
    } catch (error) {
        console.error('Error occurred while listing shortcut links of a user', error)
        return response.errorInternal(res, error, 'Something went wrong!')
    }
}

const deleteShortcutHandler = async (req, res) => {
    const { id: userId } = req.user
    const { shortcut_id } = req.params
    try {
        const payload = {
            is_deleted: true,
            deleted_at: new Date().toISOString()
        }
        const shortcutLink = await UserModel.relatedQuery('shortcuts')
            .for(userId)
            .findById(shortcut_id)
            .where({ is_deleted: false })

        if (!shortcutLink) {
            return response.notFound(res, 'Shortcut Link not found')
        }

        await shortcutLink.$query().patch(payload)
        return response.noContentSuccess(res, 'Shortcut Link deleted successfully')
    } catch (error) {
        console.error('Error occurred while deleting a shortcut link of a user', error)
        return response.errorInternal(res, error, 'Something went wrong!')
    }
}

module.exports = {
    createShortcutHandler,
    getAllShortcutsHandler,
    deleteShortcutHandler
}