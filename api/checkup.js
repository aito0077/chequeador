var when = require('when'),
    debug = require('debug')('chequeador'),
    _ = require('underscore'),
    persistence = require('../models'),
    quotes = require('./quote'),
    filteredAttributes = ['created_by', 'created'],
    checkups;

checkups = {
    browse: function browse(options) {

        debug("browse");
        var fetch_options = _.extend(options, {
            withRelated: ['quote']
        });
        return persistence.Checkup.browse(fetch_options).then(function (result) {
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
        return persistence.Checkup.read(args, {
            withRelated: ['quote', 'sources', 'contexts']
        }).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Checkup not found'});
        });
    },

    edit: function edit(data) {
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
        var checkup_to_persist = {
            status: 'OPEN',
            phase: 'CREATION',
            created: 'aito' //SESSION
        },
        quote = data.quote,
        new_quote = {
            text: quote.text,
            author: quote.author.id || 1, //ENTITY
            _where: quote.where,
            when:   quote.when,
            category_id: quote.category.id,
            rate: quote.rate
        };
        return persistence.Checkup.add(checkup_to_persist).then(function (result) {
            if (result) {
                new_quote.checkup_id = result.id;
                quotes.add(new_quote);
                return result;
            }
            return when.reject({errorCode: 404, message: 'Checkup not inserted'});
        });
    }


};

module.exports = checkups;
module.exports.filteredAttributes = filteredAttributes;


