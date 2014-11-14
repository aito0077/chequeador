var when = require('when'),
    debug = require('debug')('chequeador'),
    _ = require('underscore'),
    persistence = require('../models'),
    filteredAttributes = ['created_by', 'created'],
    checkups;

checkups = {
    browse: function browse(options) {

        debug("browse");
        return persistence.Checkup.browse(options).then(function (result) {
            var i = 0,
                omitted = {};

            if (result) {
                omitted = result.toJSON();
                debug(omitted);
            }

            for (i = 0; i < omitted.length; i = i + 1) {
                omitted[i] = _.omit(omitted[i], filteredAttributes);
            }

            return omitted;
        });
    },

    read: function read(args) {
        return persistence.Checkup.read(args).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Checkup not found'});
        });
    },

    edit: function edit(data) {
        debug("Edit");
        data.id = this.checkup;
        return persistence.Checkup.edit(data).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Checkup not found'});
        });
    },

    add: function add(data) {
        debug("Add");
        debug(data);
        return persistence.Checkup.add(data);
    }


};

module.exports = checkups;
module.exports.filteredAttributes = filteredAttributes;


