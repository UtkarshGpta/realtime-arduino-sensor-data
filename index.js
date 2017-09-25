var express = require("express");
var app = express();

// app.all("*", function(request, response, next) {
//   response.writeHead(200, { "Content-Type": "text/plain" });
//   next();
// });

app.get("/", function(request, response) {
	response.send("Welcome to Homepage!");
});

app.get("/post_data", function(request, response) {
  response.send("Welcome to the about page!");
});

app.get("*", function(request, response) {
  response.send("404!");
});

app.listen(3000);
