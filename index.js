var express = require("express");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://heroku_w3mw9ds3:1pt1npmhd9tvcde69jdjj03o61@ds147864.mlab.com:47864/heroku_w3mw9ds3";
var app = express();

// app.all("*", function(request, response, next) {
//   response.writeHead(200, { "Content-Type": "text/plain" });
//   next();
// });

app.set('port', (process.env.PORT || 5000));

app.get("/", function(request, response) {
	response.send("Welcome to Homepage!");
});

app.get("/post_data", function(request, response) {
  console.log("Entered Get");
  console.log(request.query);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err; 
    db.collection('tf1').insert({
      'current': request.query.current,
      'temperature': request.query.temperature,
      'voltage': request.query.voltage,
      'moisture_content': request.query.moisture_content
    });
  });
  response.send("Welcome to the about page!");
});

app.get("*", function(request, response) {
  response.send("404!");
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
