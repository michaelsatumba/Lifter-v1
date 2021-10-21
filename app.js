require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var ejs = require("ejs");
var mongoose = require("mongoose");
var session = require("express-session");
var passport = require("passport");
var passportLocalMongoose = require("passport-local-mongoose");

var app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb://localhost:27017/LifterDB", {
  useNewUrlParser: true
});

const LifterSchema = new mongoose.Schema({
  email: String,
  password: String
});

LifterSchema.plugin(passportLocalMongoose);

const Lifter = new mongoose.model("Lifter", LifterSchema);

passport.use(Lifter.createStrategy());

passport.serializeUser(Lifter.serializeUser());
passport.deserializeUser(Lifter.deserializeUser());

app.get("/", function(req, res) {
  res.render("../public/html/index")
});

app.get("/register", function(req, res) {
  res.render("../public/html/register")
});

app.get("/myProfile", function(req, res) {
  if (req.isAuthenticated()){
    res.render("../public/html/myProfile");
  } else {
    res.redirect("/");
  }
});

app.post("/register", function(req, res) {

  Lifter.register({username: req.body.email}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.render("../public/html/index")
      })
    }
  })

});

app.post("/", function(req, res, window) {

  const lifter = new Lifter({
    username: req.body.email,
    password: req.body.password
  });

  req.login(lifter, function(err){
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function(){
        res.render("../public/html/index")
      });
    }
  })

});

app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});





app.get("/matching", function(req, res) {
  res.render("../public/html/matching")
});

app.get("/tnc", function(req, res) {
  res.render("../public/html/tnc")
});

app.get("/support", function(req, res) {
  res.render("../public/html/support")
});

app.get("/forgotPassword", function(req, res) {
  res.render("../public/html/forgotPassword")
});

app.get("/underConstruction", function(req, res) {
  res.render("../public/html/underConstruction")
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started on port 3000");
});
