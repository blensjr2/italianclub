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

/*
var fs = require("fs");
var dbFile = "./.data/sqlite.db";
var exists = fs.existsSync(dbFile);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(dbFile);
*/

// init nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('views', {
  autoescape: true,
  express: app
})

// init nodemailer
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'blensjr2@gmail.com',
    pass: 'Fortnite24'
  }
});


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.render("index.html", {
    fluid: true
  });
});

app.get("/home", function(request, response) {
  response.redirect('/')
});

app.get("/register", function(request, response) {
  response.render("register.html");
});

/* This is how you can send an error that reloads the page w/ a message
  res.redirect("/register?error=true")
  
  if (req.query.error) {
    res.render("register.html", { error: true })
  } else {
    res.render("register.html")
  }
*/

app.get("/registrationError", function(req, res) {
  res.render("register.html", {error: true})  
})

app.get("/contact", function(request, response) {
  response.render("contact.html");
});

app.get("/contactError", function(request, response) {
  response.render("contact.html", {error: true})
});

app.get("/calendar", function(request, response) {
  response.render("calendar.html");
});

app.post("/register", function(req, res) {
  let email = req.body.email
  let grade = req.body.grade
  let why = req.body.why
  
  if (!(email && grade && why)) {
    res.redirect("/registrationError")
  } else {
    // send email
    var mailOptions = {
        from: 'blensjr2@gmail.com',
        to:   'blensjr2@gmail.com',
        subject: 'New Registrant',
        html: `
                <h1>New Registrant</h1>
                <ul>
                  <li>Email: ${email}</li>
                  <li>Grade: ${grade}</li>
                  <li>Why: ${why}</li>
                </ul>
              `
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    
    res.redirect("/")
    
  }
  
// here
});

app.post("/contact", function(req, res) {
  let Email2 = req.body.Email2
  let FirstName = req.body.FirstName
  let LastName = req.body.LastName
  let Subject = req.body.Subject
  let Message = req.body.Message
           
  if (!(Email2 && FirstName && LastName && Subject && Message)) {
    res.redirect("/contactError")
  } else {
  
  var mailOptions = {
    from: 'blensjr2@gmail.com',
    to:   'blensjr2@gmail.com',
    subject: Subject,
    html: `
            <h1>Message From Student</h1>
            <ul>
              <li>Name: ${FirstName} ${LastName}</li>
              <li>Message: ${Message}</li>
            </ul>
          `
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
  res.redirect("/")
  }
})



// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});