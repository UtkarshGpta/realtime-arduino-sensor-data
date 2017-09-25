const
express = require("express")
bodyParser = require('body-parser')
MongoClient = require('mongodb').MongoClient

var url = "mongodb://utkarsh:moneyball@ds147864.mlab.com:47864/heroku_w3mw9ds3"
var app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

app.get("/", function(request, response, next) {
	response.send("Welcome to Homepage!");
});

app.post("/post_data", function(request, response) {
  console.log(request.body)
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    
    var current = request.query.current
    var temperature = request.query.temperature
    var voltage = request.query.voltage
    var moisture_content = request.query.moisture_content

    /* Insert element in database */
    
    db.collection('tf1').insert({
      'current': current,
      'temperature': temperature,
      'voltage': voltage,
      'moisture_content': moisture_content
    });

    response.end("POST Request Successful!");
  });
});

app.get("*", function(request, response) {
  response.send("Error 404");
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
