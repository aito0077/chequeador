var when = require('when'),
    debug = require('debug')('chequeador'),
    _ = require('underscore'),
    persistence = require('../models'),
    quotes = require('./quote'),
    contexts = require('./context'),
    action = require('./action'),
    entities = require('./entity'),
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
                
                return contexts.browse({
                    checkup_id: result.id
                }).then(function(contexts_result) {
                    omitted.full_contexts = contexts_result;
                    return omitted;
                });

            }
            return when.reject({errorCode: 404, message: 'Checkup not found'});
        });
    },

    updatePhase: function updatePhase(checkup_id, phase) {

        return persistence.Checkup.read({id: checkup_id}).then(function (result) {
            if (result) {
                return result.save({phase: phase});
            }
            return when.reject({errorCode: 404, message: 'Checkup not found'});
        });
    },

    voteUp: function voteUp(args) {
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

    voteDown: function voteDown(args) {
        var user_id = this.user.id;

        return persistence.Checkup.read(args).then(function (result) {
            if (result) {
                var new_rate = result.get('rate') - 1;
                result.save({rate: new_rate}).then(function(model) {
                    action.add({
                        made_by: user_id,
                        on: result.id,
                        type: 5,
                        created_by: user_id
                    });
                });

                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Checkup not found'});
        });
    },

    checkups_collaborators: function edit(data) {
        var user_id = _.isUndefined(this.user) ? false : this.user.id ;
        debug('user_id: '+user_id);
        return persistence.Persistence.knex
                    .column('on', 'made_by', 'username', 'picture', 'type')
                    .select()//.distinct('on','made_by')
                    .from('Action')
                    .innerJoin('User', 'Action.made_by', 'User.id')
                    //.whereIn('type', [2, 3, 4])
                    .groupBy('on', 'made_by', 'username', 'picture', 'type')
                    .then(function(rows) {
                        var map = {},
                            votes = {},
                            map_keys = {};
                        
                        _.each(rows, function(row) {
                            var on = row['on'],
                                made_by = row['made_by'],
                                type = row['type'],
                                uniq_key = on+'-'+made_by;

                            if(!_.contains([1,5], type)) {
                                if(_.isUndefined(map[on])) {
                                    map[on] = [];
                                } 
                                if(_.isUndefined(map_keys[uniq_key])) {
                                    map[on].push(row); 
                                    map_keys[uniq_key] = true;
                                }
                            } else {
                                debug('Usuario vota? '+row['made_by']+' - '+row['type']);
                                if(user_id && made_by == user_id) {
                                    votes[on] = type;
                                }
                            }
                        });
                        return {
                            collaborators: map,
                            own_votes: votes
                        };
                    }).catch(function(error) {
                        debug(error);
                        return {};
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
            //entity: quote.author.id, //ENTITY
            _where: quote.where,
            when:   quote.when,
            category_id: quote.category.id,
            rate: quote.rate
        },
        new_entity = {
            name: quote.author,
            type: 1 //Hasta tanto administremos entidades
        };

        return persistence.Entity.add(new_entity).then(function (result_entity) {
            debug('insertada entidad');
            checkup_to_persist.entity_id = result_entity.id;
            new_quote.entity_id = result_entity.id;
            return persistence.Checkup.add(checkup_to_persist).then(function (result) {
                debug('insertada checkup');
                if (result) {
                    new_quote.checkup_id = result.id;
                    quotes.add(new_quote).then(function() {
                        debug('insertada quote');
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
        });
    }


};

module.exports = checkups;
module.exports.filteredAttributes = filteredAttributes;


