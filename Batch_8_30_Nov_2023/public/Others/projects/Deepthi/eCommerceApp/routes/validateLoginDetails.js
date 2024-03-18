var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;

const MongoUrl = 'mongodb://localhost:27017';
const client = new MongoClient(MongoUrl);

router.post('/', function (req, res, next) {
  // for POST it should be req.body
  console.log(req.body);
  var responseObj = {};

  getMongoConnection(req.body).then((response) => {

    if (response.length == 1) {
      responseObj.msg = 'Valid';
      console.log(responseObj.msg);
    } else {
      responseObj.msg = 'Invalid';
      console.log(responseObj.msg);
    }
    res.send(JSON.stringify(responseObj));

  }).catch((error) => {
    responseObj.msg = 'Error while connecting to database';
  })

});

async function getMongoConnection(userData) {
  console.log("user" + userData);
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db("eCommerceApp");
  const collection = db.collection("userAccountDetails");
  return collection.find({ accountId: userData.userId, password: userData.password }).toArray();
}
module.exports = router;
