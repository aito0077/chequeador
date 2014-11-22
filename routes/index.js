var express = require('express'),
    debug = require('debug')('chequeador'),
    router = express.Router();

router.get('/', function(req, res) {
    debug('user');
    debug(req.user);
    
   var user_data;
    if(req.user) {
        user_data = req.user['attributes'];
    }
    res.render('index', { 
        title: 'Express',
        user: user_data
    });
});

module.exports = router;
