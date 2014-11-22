var express = require('express'),
    debug = require('debug')('chequeador'),
    router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
