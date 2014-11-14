var Quote,
    Quotes,
    Category = require('./category').Category,
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

    read: function () {
        return this.findOne.apply(this, arguments, {
            withRelated: ['category']
        });
    },

    checkup: function () {
        return this.belongsTo(Checkup);
    },

    category: function() {
        return this.belongsTo(Category, 'category_id');
    }



});

Quotes = Persistence.Collection.extend({
    model: Quote
});

module.exports = {
    Quote: Quote,
    Quotes: Quotes
};








