var when = require('when'),
    _ = require('underscore'),
    entities = require('./entity'),
    persistence = require('../models'),
    filteredAttributes = [],
    sources;

sources = {
    browse: function browse(options) {
        var fetch_options = _.extend(options, {
            withRelated: ['sourceType', 'entity']
        });
        return persistence.Source.browse(fetch_options).then(function (result) {
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
        return persistence.Source.read(args, {
            withRelated: ['sourceType']
        }).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Source not found'});
        });
    },

    edit: function edit(data) {
        data.id = this.source;
        return persistence.Source.edit(data).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Source not found'});
        });
    },

    add: function add(data) {
        return persistence.Source.add(data);

        var source_to_persist = {
                created: 'aito' //SESSION
            },
            entity = data.entity,
            new_entity = {
                name: entity.name,
                description: entity.description,
                type: entity.type || 1
            };

        entities.add(new_entity).then(function (result_entity) {
            return persistence.Source.add(source_to_persist).then(function (result) {
                if (result) {
                    return result;
                }
                return when.reject({errorCode: 404, message: 'Source not inserted'});
            });
        });


    }


};

module.exports = sources;
module.exports.filteredAttributes = filteredAttributes;


