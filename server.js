// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();

// init nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('views', {
  autoescape: true,
  express: app
})



// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.render("mainpage.html");
});

app.get("/home", function(request, response) {
  response.render("layout.html");
});

app.get("/register", function(request, response) {
  response.render("registration.html");
});

app.get("/moreinfo", function(request, response) {
  response.render("moreinfo.html");
});

app.get("/calendar", function(request, response) {
  response.render("calendar.html");
});

app.get("/mainpage", function(request, response) {
  response.render("mainpage.html");
});


// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
