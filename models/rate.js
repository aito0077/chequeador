var Rate,
    Rates,
    _              = require('underscore'),
    Persistence    = require('./base');


Rate = Persistence.Model.extend({

    tableName: 'Rate',

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

Rates = Persistence.Collection.extend({
    model: Rate
});

module.exports = {
    Rate: Rate,
    Rates: Rates
};








