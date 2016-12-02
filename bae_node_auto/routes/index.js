var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var nowTime = new Date();

  res.render('ok');
});






module.exports = router;
