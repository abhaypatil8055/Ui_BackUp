var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var responseObj = {};
  responseObj.msg = 'Success';
  res.send(JSON.stringify(responseObj));
});

module.exports = router;
