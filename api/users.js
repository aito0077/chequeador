var when = require('when'),
    _ = require('underscore'),
    debug = require('debug')('chequeador'),
    persistence = require('../models'),
    ONE_DAY = 86400000,
    filteredAttributes = ['password', 'created_by', 'created'],
    users;

users = {
    browse: function browse(options) {
        return persistence.User.browse(options).then(function (result) {
            var i = 0,
                omitted = {};

            if (result) {
                omitted = result.toJSON();
            }

            for (i = 0; i < omitted.length; i = i + 1) {
                omitted[i] = _.omit(omitted[i], filteredAttributes);
            }

            return omitted;
        });
    },

    read: function read(args) {
        if (args.id === 'me') {
            args = {id: this.user};
        }

        return persistence.User.read(args).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }

            return when.reject({errorCode: 404, message: 'User not found'});
        });
    },

    stats: function read(args) {
        var user_id = args.id;
        debug('User ID: '+user_id);
        return persistence.Persistence.knex
        .select()
        .column('Action.type')
        .count('Action.id as amount')
        .from('User')
        .innerJoin('Action', 'User.id', 'Action.made_by')
        .where('User.id', user_id)
        .groupBy('Action.type')
        .then(function(rows) {
            return rows;
        }).catch(function(err){
            debug(err);
            return {errorCode: 404, message: 'User not found'};
        });

    },

    edit: function edit(data) {
        data.id = this.user;
        return persistence.User.edit(data).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'User not found'});
        });
    },

    block: function remove(args) {
        var user_is_admin = this.user.admin;

        return persistence.User.read(args).then(function (result) {
            if (result && user_is_admin) {
                return result.save({blocked: true}).then(function(model) {
                    return {errorCode: 202, message: 'User blocked'};
                });
            } else {
                return when.reject({errorCode: 404, message: 'User not found to block or not admin'});
            }
        });
    },

    unblock: function remove(args) {
        var user_is_admin = this.user.admin;

        return persistence.User.read(args).then(function (result) {
            if (result && user_is_admin) {
                return result.save({blocked: false}).then(function(model) {
                    return {errorCode: 202, message: 'User unblocked'};
                });
            } else {
                return when.reject({errorCode: 404, message: 'User not found to unblock or not admin'});
            }
        });
    },



    add: function add(data) {
        return persistence.User.add(data);
    }

    /*
    check: function check(data) {
        return persistence.User.check(data);
    }
    */

};

module.exports = users;
module.exports.filteredAttributes = filteredAttributes;
