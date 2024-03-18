var express = require('express');
var router = express.Router();

/* GET home page. */
 /* router.get('/', function(req, res, next) {

    console.log(req.query);   // if GET is used then "req.query"

    var validResponseObj = {msg : 'success'};

    res.send(JSON.stringify(validResponseObj));
}); */

router.post('/', function(req, res, next) {

    console.log(req.body); // if POST is used then "req.body"

    var validResponseObj = {msg : 'success'};

    if (req.body.accountId == 'Dheeraj_user' && req.body.accountpassword == 'sai2905') {
        validResponseObj.msg = "Valid";
    } else {
        validResponseObj.msg = "Invalid";
    }
    res.send(JSON.stringify(validResponseObj));
});
module.exports = router;
