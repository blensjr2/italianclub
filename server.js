// server.js
// where your node app starts

// init project
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// init sqlite db
var fs = require("fs");
var dbFile = "./.data/sqlite.db";
var exists = fs.existsSync(dbFile);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(dbFile);

// init nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('views', {
  autoescape: true,
  express: app
})


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

app.post("/register", function(req, res) {
  let email = req.body.emailAddress
  let grade = req.body.grade
  let why = req.body.why
  
  let JSON = {
    "email": email,
    "grade": grade,
    "why": why
  }
  
  console.log(JSON)
})

app.get("/contact", function(request, response) {
  response.render("contact.html");
});

app.get("/calendar", function(request, response) {
  response.render("calendar.html");
});


// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
