var when = require('when'),
    _ = require('underscore'),
    persistence = require('../models'),
    action = require('./action'),
    filteredAttributes = ['created_by', 'created'],
    contexts;

contexts = {
    browse: function browse(options) {
        return persistence.Context.browse(options).then(function (result) {
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
        return persistence.Context.read(args).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Context not found'});
        });
    },

    edit: function edit(data) {
        data.id = this.context;
        return persistence.Context.edit(data).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Context not found'});
        });
    },

    add: function add(data) {
        var user_id = this.user.id;
        return persistence.Context.add(data).then(function(result) {
            action.add({
                made_by: user_id,
                on: result.id,
                type: 2,
                created_by: user_id
            });
        });
    }


};

module.exports = contexts;
module.exports.filteredAttributes = filteredAttributes;




