var Source,
    Sources,
    _              = require('underscore'),
    Persistence    = require('./base');


Source = Persistence.Model.extend({

    tableName: 'Source',

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

Sources = Persistence.Collection.extend({
    model: Source
});

module.exports = {
    Source: Source,
    Sources: Sources
};









