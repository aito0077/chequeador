var when = require('when'),
    _ = require('underscore'),
    persistence = require('../models'),
    checkups = require('./checkup'),
    filteredAttributes = ['created_by', 'created'],
    rates;

rates = {
    browse: function browse(options) {
        var fetch_options = _.extend(options, {
            withRelated: ['qualified', 'scored']
        });
        return persistence.Rate.browse(fetch_options).then(function (result) {
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
        return persistence.Rate.read(args).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Rate not found'});
        });
    },

    edit: function edit(data) {
        data.id = this.rate;
        return persistence.Rate.edit(data).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Rate not found'});
        });
    },

    add: function add(data) {
        var user_id = this.user.id,
            checkup_id = data.checkup_id;
        data.user_id = user_id;
        return persistence.Rate.add(data).then(function(rate_result) {
            checkups.updatePhase(checkup_id, 'QUALIFICATION');
            return rate_result;
        });
    }


};

module.exports = rates;
module.exports.filteredAttributes = filteredAttributes;



