var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var ejs = require("ejs");

var app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

const userSchema = {
  email: String,
  password: String
};

const User = new mongoose.model("User", userSchema);

app.get("/", function(req, res){
  res.render("../public/html/index")
})

app.get("/register", function(req, res){
  res.render("../public/html/register")
})

app.post("/register", function(req.res){
  const newUser = new User ({
    email: req.body.email,
    password: req.body.password
  });
  newUser.save
})

app.get("/tnc", function(req, res){
  res.render("../public/html/tnc")
})

app.get("/support", function(req, res){
  res.render("../public/html/support")
})

app.get("/forgotPassword", function(req, res){
  res.render("../public/html/forgotPassword")
})


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started on port 3000");
});
