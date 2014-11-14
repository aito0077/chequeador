var Checkup,
    Checkups,
    _ = require('underscore'),
    Quote = require('./quote').Quote,
    Persistence = require('./base');


Checkup = Persistence.Model.extend({

    tableName: 'Checkup',

    permittedAttributes: [

    ],

    quote: function() {
        return this.hasOne(Quote, 'checkup_id');
    },

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

Checkups = Persistence.Collection.extend({
    model: Checkup
});

module.exports = {
    Checkup: Checkup,
    Checkups: Checkups
};




