var Quote,
    Quotes,
    _              = require('underscore'),
    Persistence    = require('./base');


Quote = Persistence.Model.extend({

    tableName: 'Quote',

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

Quotes = Persistence.Collection.extend({
    model: Quote
});

module.exports = {
    Quote: Quote,
    Quotes: Quotes
};








