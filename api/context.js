var when = require('when'),
    _ = require('underscore'),
    persistence = require('../models'),
    _checkups = require('./checkup'),
    action = require('./action'),
    debug = require('debug')('chequeador'),
    filteredAttributes = ['created', 'tags'],
    contexts;

contexts = {
    browse: function browse(options) {
        return persistence.Persistence.knex
            .column('Context.id', 'body', 'username', 'picture', 'tags', 'checkup_id')
            .select()
            .from('Context')
            .innerJoin('User', 'Context.created_by', 'User.id')
            .where('checkup_id', options.checkup_id)
            .then(function(rows) {
                return rows;
            }).catch(function(error) {
                return {error: error};
            });

    },

    read: function read(args) {
        return persistence.Context.read(args, {
            withRelated: ['creator']
        }).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Context not found'});
        });
    },

    edit: function edit(data) {
        return persistence.Context.edit(data, {id: data.id}).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Context not found'});
        });
    },

    add: function add(data) {
        var user_id = this.user.id,
            checkup_id = data.checkup_id;
            if(_checkups) {
               // _checkups.updatePhase(checkup_id, 'CONTEXT');
            }

        data.created_by = user_id;
        return persistence.Context.add(data).then(function(result) {
            action.add({
                made_by: user_id,
                on: result.id,
                type: 2,
                created_by: user_id
            });
        });
    },

    remove: function remove(args) {
        var user_is_admin = this.user.admin;

        debug('User is admin? '+user_is_admin);

        if (user_is_admin) {
            return persistence.Context.delete(args.id).then(function (result) {
            return result;
            });
        }
        return when.reject({errorCode: 404, message: 'Context not found'});
    }




};

module.exports = contexts;
module.exports.filteredAttributes = filteredAttributes;

