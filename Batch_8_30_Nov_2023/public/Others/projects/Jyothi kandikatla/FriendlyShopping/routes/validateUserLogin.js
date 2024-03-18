var express = require('express');
var router = express.Router();
var utilData = require('./monogoCommon');//importing the user defined modules
var mongoClient = utilData.dbConDetails.mongoClient;
const bcrypt = require('bcrypt');
router.post('/', function(req, res, next) {
    var responseObj = {};
        getMongoConnection(req.body).then((response) => {
   console.log('response')
   console.log(response)
            bcrypt.compare(req.body.password, response[0].password, function(err, result) {
                console.log('result')
                console.log(result)
                if(result){
                    responseObj.msg = 'Valid';
                }else{
                    responseObj.msg = 'Invalid';
                }
               // responseObj.msg = result ? 'Valid' : 'Invalid';
                res.send(JSON.stringify(responseObj));
            });
            
        }).catch((error) => {
            responseObj.msg = 'Error while connecting to DB';
        });    
});
    async function getMongoConnection(userData){//duplicate param
     console.log("userData")//here user data having login credentials
     console.log(userData);
        await mongoClient.connect();
        const db =  mongoClient.db('FriendlyShopping');
        const collection = db.collection('login');
        return collection.find({username: userData.username}).toArray();
    }

module.exports = router;