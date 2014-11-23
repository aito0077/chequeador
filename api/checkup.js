var when = require('when'),
    debug = require('debug')('chequeador'),
    _ = require('underscore'),
    persistence = require('../models'),
    quotes = require('./quote'),
    action = require('./action'),
    entity = require('./entity'),
    filteredAttributes = ['created_by', 'created'],
    checkups;

checkups = {
    browse: function browse(options) {

        var fetch_options = _.extend(options, {
            withRelated: ['quote', 'entity']
        });
        return persistence.Checkup.browse(fetch_options).then(function (result) {
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
        return persistence.Checkup.read(args, {
            withRelated: ['quote', 'sources', 'contexts', 'entity', 'qualifications']
        }).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Checkup not found'});
        });
    },

    voteUp: function read(args) {
        var user_id = this.user.id;

        return persistence.Checkup.read(args).then(function (result) {
            if (result) {
                var new_rate = result.get('rate') + 1;
                result.save({rate: new_rate}).then(function(model) {
                    action.add({
                        made_by: user_id,
                        on: result.id,
                        type: 1,
                        created_by: user_id
                    });
                });

                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Checkup not found'});
        });
    },

    voteDown: function read(args) {
        var user_id = this.user.id;

        return persistence.Checkup.read(args).then(function (result) {
            if (result) {
                var new_rate = result.get('rate') - 1;
                result.save({rate: new_rate}).then(function(model) {
                    action.add({
                        made_by: user_id,
                        on: result.id,
                        type: 1,
                        created_by: user_id
                    });
                });

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
            created_by: this.user.id
        },
        user_id = this.user.id,
        quote = data.quote,
        new_quote = {
            text: quote.text,
            entity: quote.author.id || 1, //ENTITY
            _where: quote.where,
            when:   quote.when,
            category_id: quote.category.id,
            rate: quote.rate
        };
        return persistence.Checkup.add(checkup_to_persist).then(function (result) {
            if (result) {
                new_quote.checkup_id = result.id;
                quotes.add(new_quote).then(function() {
                    action.add({
                        made_by: user_id,
                        on: result.id,
                        type: 3,
                        created_by: user_id
                    });
                });
                return result;
            }
            return when.reject({errorCode: 404, message: 'Checkup not inserted'});
        });
    }


};

module.exports = checkups;
module.exports.filteredAttributes = filteredAttributes;


