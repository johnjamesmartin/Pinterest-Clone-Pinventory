var express = require('express');
var router = express.Router();
const sample = require('../sample');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pins', pins: sample });
});

module.exports = router;
