var express = require("express");
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();
var path = require('path');
var config = require('./config.js');
var date = new Date();
var PubNub = require('pubnub');

var pubnub = new PubNub({
  publishKey : 'pub-c-b05337d3-6133-4097-9fcd-d2acdfdd9e77',
  subscribeKey : 'sub-c-22ea1e5a-099b-11e8-8425-92777572ae45'
});

var db_url = "mongodb://localhost:27017";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(request, response, next) {
	response.sendFile(path.join(__dirname, 'views/index.html'));
});

var client;

MongoClient.connect(db_url, function(err, cli) {
  if (err) throw err;
  client = cli;
  console.log("DB Connected");
});

app.post("/post_data", function(request, response) {
  var db = client.db(config.db.name);
  var timestamp = request.body.timestamp;
  var current = request.body.current;
  var temperature = request.body.temperature;
  var voltage = request.body.voltage;
  var moisture_content = request.body.moisture_content;

  /* Publish data to PubNub to dynamically vizualise sensor values */
  var publish_data = {
    'voltage': voltage,
    'current': current,
    'temperature': temperature,
    'moisture_content': moisture_content
  };

  var publishConfig = {
    channel : 'transformer_data',
    message: {"eon": publish_data}
  };

  pubnub.publish(publishConfig, function (status, response) {
    if (status.error) {
        console.log("PubNub Error ", status)
    } else {
        console.log("message Published w/ timetoken", response.timetoken)
    }
  });

  /* Insert element in database */
  var insert_data = {
    'timestamp': timestamp,
    'current': current,
    'temperature': temperature,
    'voltage': voltage,
    'moisture_content': moisture_content
  };

  db.collection('tf1').insert(insert_data, function(err){
      if(err) throw err;
      console.log("Inserted");
  });

  response.end("POST Request Successful!");
});

app.get("*", function(request, response) {
  response.send("Error 404");
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
