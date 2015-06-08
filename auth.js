var when = require('when'),
    config = require('./config/config.json'),
    keys = require('./config/keys.json'),
    debug = require('debug')('chequeador'),
    gravatar = require('gravatar'),
    moment = require('moment'),
    jwt = require('jwt-simple'),
    bcrypt = require('bcryptjs');
    express = require('express'),
    router = express.Router(),
    _ = require('underscore'),
    User = require('./models/user').User;

module.exports = function() {

    var keepReturnUrl = function(req, res, next) {
      if(!req.session) req.session = {};
        debug('Retorno a: '+req.url);
      req.session.back_url = (req.url) || '/';
      next();
    };

    var redirectReturnUrl = function(req, res) {
      var back_url = '/';
        debug('Session back: '+req.session.back_url);
      if (!_.isUndefined(req.session.back_url)) {
        back_url = req.session.back_url; 
        debug('Retorno a: '+back_url);
      }

      res.redirect(back_url);
    };


    function createJWT(user_id) {
        var payload = {
            sub: user_id,
            iat: moment().unix(),
            exp: moment().add(14, 'days').unix()
        };
        debug(payload);
        return jwt.encode(payload, config.token_secret);
    };

    var addToken = function(req, res) {
        debug.res();
        res.send({ token: createJWT(req.user) });
    };

    router.post('/facebook', function(req, res) {
      var accessTokenUrl = 'https://graph.facebook.com/v2.3/oauth/access_token';
      var graphApiUrl = 'https://graph.facebook.com/v2.3/me';
      var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: config.FACEBOOK_SECRET,
        redirect_uri: req.body.redirectUri
      };

      // Step 1. Exchange authorization code for access token.
      request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
        if (response.statusCode !== 200) {
          return res.status(500).send({ message: accessToken.error.message });
        }

        // Step 2. Retrieve profile information about the current user.
        request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
          if (response.statusCode !== 200) {
            return res.status(500).send({ message: profile.error.message });
          }

              User.read({provider_id: profile.id, provider: 'facebook'}, {}).then(function(user) {
                function setPicture(){
                  if(profile.photos && profile.photos.length && profile.photos[0].value) {
                    user.picture =  profile.photos[0].value.replace('_normal', '_bigger');
                  } else if(profile.provider == 'facebook') {
                    user.picture = "https://graph.facebook.com/" + profile.id + "/picture";
                    user.picture += "?width=73&height=73";
                  } else {
                    user.picture = gravatar.url(user.email || '', {s: '73'});
                  }

                  user.picture = user.picture || '/default_avatar.png';
                }
                debug(user);

                if(!user) {
                    debug('New user');
                  var user = {};
                  user.provider = provider;
                  user.provider_id = profile.id;

                  if(profile.emails && profile.emails.length && profile.emails[0].value)
                    user.mail = profile.emails[0].value;

                  setPicture();
                  
                  user.name = profile.displayName || '';
                  user.username = profile.username || profile.displayName;


                  User.add(user).then(function(user_persisted){
                    var token = createJWT(user_persisted.id);
                    res.send({ token: token });
                  });
                } else { 
                    debug('User blocked: '+user.toJSON().blocked);
                    if(user.toJSON().blocked == 1) {
                        debug('User blocked');
                        return done(null, false, { message: 'User blocked.' });
                    }
                    debug('Existing user');
                    var picBefore = user.picture;
                    setPicture();

                    if (user.picture !== picBefore){
                        User.update(user.toJSON()).then(function(user_persisted) {  
                            var token = createJWT(user_persisted.id);
                            res.send({ token: token });
                        });
                    } else {
                        var token = createJWT(user.id);
                        res.send({ token: token });
                        done(null, user);
                    }

                }
              }) ;

            });
        });
    });


    router.post('/twitter', function(req, res) {
      var requestTokenUrl = 'https://api.twitter.com/oauth/request_token';
      var accessTokenUrl = 'https://api.twitter.com/oauth/access_token';
      var profileUrl = 'https://api.twitter.com/1.1/users/show.json?screen_name=';

      // Part 1 of 2: Initial request from Satellizer.
      if (!req.body.oauth_token || !req.body.oauth_verifier) {
        var requestTokenOauth = {
          consumer_key: config.TWITTER_KEY,
          consumer_secret: config.TWITTER_SECRET,
          callback: config.TWITTER_CALLBACK
        };

        // Step 1. Obtain request token for the authorization popup.
        request.post({ url: requestTokenUrl, oauth: requestTokenOauth }, function(err, response, body) {
          var oauthToken = qs.parse(body);

          // Step 2. Send OAuth token back to open the authorization screen.
          res.send(oauthToken);
        });
      } else {
        // Part 2 of 2: Second request after Authorize app is clicked.
        var accessTokenOauth = {
          consumer_key: config.TWITTER_KEY,
          consumer_secret: config.TWITTER_SECRET,
          token: req.body.oauth_token,
          verifier: req.body.oauth_verifier
        };

        // Step 3. Exchange oauth token and oauth verifier for access token.
        request.post({ url: accessTokenUrl, oauth: accessTokenOauth }, function(err, response, accessToken) {

          accessToken = qs.parse(accessToken);

          var profileOauth = {
            consumer_key: config.TWITTER_KEY,
            consumer_secret: config.TWITTER_SECRET,
            oauth_token: accessToken.oauth_token
          };

          // Step 4. Retrieve profile information about the current user.
          request.get({
            url: profileUrl + accessToken.screen_name,
            oauth: profileOauth,
            json: true
          }, function(err, response, profile) {

              User.read({provider_id: profile.id, provider: 'twitter'}, {}).then(function(user) {
                function setPicture(){
                  if(profile.photos && profile.photos.length && profile.photos[0].value) {
                    user.picture =  profile.photos[0].value.replace('_normal', '_bigger');
                  } else if(profile.provider == 'facebook') {
                    user.picture = "https://graph.facebook.com/" + profile.id + "/picture";
                    user.picture += "?width=73&height=73";
                  } else {
                    user.picture = gravatar.url(user.email || '', {s: '73'});
                  }

                  user.picture = user.picture || '/default_avatar.png';
                }
                debug(user);

                if(!user) {
                    debug('New user');
                  var user = {};
                  user.provider = provider;
                  user.provider_id = profile.id;

                  if(profile.emails && profile.emails.length && profile.emails[0].value)
                    user.mail = profile.emails[0].value;

                  setPicture();
                  
                  user.name = profile.displayName || '';
                  user.username = profile.username || profile.displayName;


                  User.add(user).then(function(user_persisted){
                    var token = createJWT(user_persisted.id);
                    res.send({ token: token });
                  });
                } else { 
                    debug('User blocked: '+user.toJSON().blocked);
                    if(user.toJSON().blocked == 1) {
                        debug('User blocked');
                        return done(null, false, { message: 'User blocked.' });
                    }
                    debug('Existing user');
                    var picBefore = user.picture;
                    setPicture();

                    if (user.picture !== picBefore){
                        User.update(user.toJSON()).then(function(user_persisted) {  
                            var token = createJWT(user_persisted.id);
                            res.send({ token: token });
                        });
                    } else {
                        var token = createJWT(user.id);
                        res.send({ token: token });
                        done(null, user);
                    }

                }
              }) ;

          });
        });
      }
    });


    router.post('/login', function(req, res) {
        User.read({mail: req.body.mail}, {}).then(function(user) {
            if (!user) {
              return res.status(401).send({ message: 'Wrong email and/or password' });
            }
            debug(user);
            bcrypt.hash(req.body.password, config.token_secret, function(err, hash) {
                debug(req.body.password+'  --  '+user.get('password')+' -- '+hash);
                bcrypt.compare(hash, user.get('password'), function(err, isMatch) {
                    debug(err);
                    if (!isMatch) {
                        return res.status(401).send({ message: 'Wrong email and/or password' });
                    }
                    res.send({ token: createJWT(user) });
                });
            });
        });
    });

    router.post('/signup', function(req, res) {
      User.read({mail: req.body.mail},{}).then(function(existingUser) {
        if (existingUser) {
          return res.status(409).send({ message: 'Email is already taken' });
        }
        var user_data = {
            username: req.body.username,
            name : req.body.username,
            mail: req.body.mail,
            password: req.body.password,
            picture: gravatar.url(req.body.mail || '', {s: '73'})
        };
        //bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user_data.password, config.token_secret, function(err, hash) {
                user_data.password = hash;
                User.add(user_data).then(function(user_persisted){
                    debug(user_persisted);
                    res.send({ token: createJWT(user_persisted) });
                });


            });
        //});

      });
    });






    return router;
};




/*
CREATE TABLE `User` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(30) NULL,
  `password` VARCHAR(30) NULL,
  `provider` VARCHAR(30) NULL,
  `provider_id` VARCHAR(60) NULL,
  `mail` VARCHAR(60) NULL,
  `picture` VARCHAR(300) NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);


*/

