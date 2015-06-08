var User,
    Users,
    when           = require('when'),
    nodefn         = require('when/node/function'),
    bcrypt         = require('bcryptjs'),
    _              = require('underscore'),
    debug = require('debug')('chequeador'),
    Persistence    = require('./base');


User = Persistence.Model.extend({

    tableName: 'User',

    permittedAttributes: [
        'id', 'name', 'password', 'mail', 'picture', 'provider', 'provider_id', 'username', 'blocked' ],

    validate: function () {
        //Persistence.validator.check(this.get('mail'), "Please enter a valid email address. That one looks a bit dodgy.").isEmail();
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

    add: function (_user) {

        var self = this,
            userData = _.extend({}, _user);
            
            debug('Usuario recibido');
            debug(_user);

            debug('Usuario a persistir');
            debug(userData);
            return Persistence.Model.add.call(self, userData);
        /*
        return validatePasswordLength(userData.password).then(function () {
            return self.forge().fetch();
        }).then(function (user) {
            if (user) {
                return when.reject(new Error('A user is already registered. Only one user for now!'));
            }
        }).then(function () {
            return generatePasswordHash(_user.password);
        }).then(function (hash) {
            userData.password = hash;
            return self.gravatarLookup(userData);
        }).then(function (userData) {
            return Persistence.Model.add.call(self, userData);
        }).then(function (addedUser) {
            userData = addedUser;
            return userData.roles().attach(1);
        }).then(function (addedUserRole) {
            return when.resolve(userData);
        });
        */

    },

    check: function (_userdata) {
        var self = this,
            s;

        return this.getByEmail(_userdata.mail).then(function (user) {
            if (user.get('status') !== 'locked') {
                return nodefn.call(bcrypt.compare, _userdata.pw, user.get('password')).then(function (matched) {
                    if (!matched) {
                        return when(self.setWarning(user)).then(function (remaining) {
                            s = (remaining > 1) ? 's' : '';
                            return when.reject(new Error('Your password is incorrect.<br>' +
                                remaining + ' attempt' + s + ' remaining!'));
                        });
                    }

                    return when(user.set('status', 'active').save()).then(function (user) {
                        return user;
                    });
                }, errors.logAndThrowError);
            }
            return when.reject(new Error('Your account is locked due to too many ' +
                'login attempts. Please reset your password to log in again by clicking ' +
                'the "Forgotten password?" link!'));

        }, function (error) {
            if (error.message === 'NotFound' || error.message === 'EmptyResponse') {
                return when.reject(new Error('There is no user with that email address.'));
            }

            return when.reject(error);
        });
    },

    getByEmail: function (mail) {
        debug('Email: '+mail);
        return Users.forge().fetch({require: true}).then(function (users) {
            var userWithEmail = users.find(function (user) {
                return (user.get('mail') ?  user.get('mail') : '').toLowerCase() === mail.toLowerCase();
            });

            if (userWithEmail) {
                return when.resolve(userWithEmail);
            }

            return when.reject(new Error('NotFound'));
        });
    }
});

Users = Persistence.Collection.extend({
    model: User
});

module.exports = {
    User: User,
    Users: Users
};
