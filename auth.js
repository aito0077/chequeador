var passport = require('passport'),
    config = require('./config/config.json'),
    keys = require('./config/keys.json');

var User = mongoose.model('User');

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user){
    done(err, user);
  });
});

module.exports = function() {

var saveSubdomain = function(req, res, next) {
  if(!req.session) req.session = {};
  req.session.subdomain = (req.subdomains.length && req.subdomains[0]) || '';
  next();
};

var redirectSubdomain = function(req, res) {
  var domain = app.get('config').host;
  if (req.session.subdomain !== '') {
    domain = req.session.subdomain + '.' + domain;
  }
  res.redirect('http://' + domain + ':' + app.get('config').port);
};


app.set('providers', Object.keys(keys));

for(var strategy in keys) {

  (function(provider){

    app.get('/auth/' + provider, saveSubdomain,
passport.authenticate(provider));
    app.get('/auth/' + provider + '/callback', passport.authenticate(provider, {
failureRedirect: '/' }), redirectSubdomain);

    var Strategy = require('passport-' + provider).Strategy;
    passport.use(new Strategy(keys[provider],
    function(token, tokenSecret, profile, done) {
      User.findOne({provider_id: profile.id, provider: provider}, function(err,
user){

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

        if(!user) {
          var user = new User();
          user.provider = provider;
          user.provider_id = profile.id;

          if(profile.emails && profile.emails.length && profile.emails[0].value)
            user.email = profile.emails[0].value;

          setPicture();
          
          user.name = profile.displayName || '';
          user.username = profile.username || profile.displayName;
          user.save(function(err, user){  
            done(null, user);
          });
        } else { 

          //Update user picture provider if url changed
          var picBefore = user.picture;
          setPicture();
          
          if (user.picture !== picBefore){
            user.save(function(err, user){  
              done(null, user);
            });
          }
          else {
            done(null, user);
          }

        }
      });
    }));

  })(strategy);

}

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
