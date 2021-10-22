require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var ejs = require("ejs");
var mongoose = require("mongoose");
var session = require("express-session");
var passport = require("passport");
var passportLocalMongoose = require("passport-local-mongoose");

var app = express();

app.use(express.static(__dirname));
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
  res.render("index")
});

app.get("/register", function(req, res) {
  res.render("register")
});

app.get("/myProfile", function(req, res) {
  if (req.isAuthenticated()) {
    res.render("/myProfile");
  } else {
    res.redirect("/");
  }
});

app.post("/register", function(req, res) {

  Lifter.register({
    username: req.body.email
  }, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
        res.redirect("/")

    }
  })

});

app.post('/', (req, res) => passport.authenticate('local', { successRedirect: '/register', failureRedirect: '/', })(req, res));

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});





app.get("/matching", function(req, res) {
  res.render("matching")
});

app.get("/tnc", function(req, res) {
  res.render("tnc")
});

app.get("/support", function(req, res) {
  res.render("support")
});

app.get("/forgotPassword", function(req, res) {
  res.render("forgotPassword")
});

app.get("/underConstruction", function(req, res) {
  res.render("underConstruction")
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started on port 3000");
});
