var Checkup,
    Checkups,
    _              = require('underscore'),
    Persistence    = require('./base');


Checkup = Persistence.Model.extend({

    tableName: 'Checkup',

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

Checkups = Persistence.Collection.extend({
    model: Checkup
});

module.exports = {
    Checkup: Checkup,
    Checkups: Checkups
};




