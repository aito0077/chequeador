var when = require('when'),
    debug = require('debug')('chequeador'),
    _ = require('underscore'),
    entities = require('./entity'),
    persistence = require('../models'),
    filteredAttributes = [],
    sourceTypes = ['ORI', 'OFI', 'ALT'],
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
        debug(data);
        debug(data['entity']);
        var entity = data.entity,
            new_entity = {
                name: entity.name,
                description: entity.description,
                type: entity.type || 1
            },
            source_to_persist = _.extend(data, {
                created: 'aito', //SESSION
                type: _.indexOf(sourceTypes, data.type)
            });

        persistence.Entity.add(new_entity).then(function (result_entity) {
            debug(result_entity);
            source_to_persist.source_entity_id = result_entity.id || 1;
            return persistence.Source.add(source_to_persist);
        });


    }


};

module.exports = sources;
module.exports.filteredAttributes = filteredAttributes;


