var Entity,
    Entities,
    _              = require('underscore'),
    Persistence    = require('./base');


Entity = Persistence.Model.extend({

    tableName: 'Entity',

    permittedAttributes: [

    ],

    validate: function () {
        return true;
    },

    creating: function () {
        var self = this;
        Persistence.Model.prototype.creating.call(this);
    },

    saving: function () {
        return Persistence.Model.prototype.saving.apply(this, arguments);
    }
}, {

});

Entities = Persistence.Collection.extend({
    model: Entity
});

module.exports = {
    Entity: Entity,
    Entities: Entities
};







