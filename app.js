"use strict";
var PubNub = require('pubnub');
var express = require("express");
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var path = require('path');
var config = require('./config.js');

var app = express();

/*
  Set PubNub's publish and subscribe key.
  If on Heroku, it'll take up the values from process.env
  else we'll need to hardcode it in config.js
*/
var pubnub = new PubNub({
  publishKey : (process.env.PUBNUB_PUBLISH_KEY) ? process.env.PUBNUB_PUBLISH_KEY : config.pubsub.publishKey ,
  subscribeKey : (process.env.PUBNUB_SUBSCRIBE_KEY) ? process.env.PUBNUB_SUBSCRIBE_KEY : config.pubsub.subscribeKey
});

var db_url;

if (process.env.MONGODB_URI) db_url = process.env.MONGODB_URI;
else db_url = config.db.localhost + ':' + config.db.port;

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

app.get("/post_data", function(request, response) {
  var db = client.db(config.db.name);
  var current = request.query.current;
  var voltage = request.query.voltage;
  var temperature = request.query.temperature;
  var power = request.query.power;

  /* Publish data to PubNub to dynamically vizualise sensor values */
  var publish_data = {
    'voltage': voltage,
    'current': current,
    'power': power,
    'temperature': temperature
  };

  var publishConfig = {
    channel : 'transformer_data',
    message: {"eon": publish_data}
  };

  pubnub.publish(publishConfig, function (status, response) {
    if (status.error) {
      console.log("PubNub Error ", status);
    }
  });

  /* Insert element in database */
  var insert_data = {
    'voltage': voltage,
    'current': current,
    'power': power,
    'temperature': temperature
  };

  db.collection('tf1-data').insert(insert_data, function(err){
      if(err) throw err;
      console.log("Data Inserted");
  });

  response.end("GET Request Successful!");
});

app.get("*", function(request, response) {
  response.send("Error 404");
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
