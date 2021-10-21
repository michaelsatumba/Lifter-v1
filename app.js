require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var ejs = require("ejs");
var encrypt = require("mongoose-encryption");


var app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect("mongodb://localhost:27017/LifterDB", {useNewUrlParser: true});

const LifterSchema = new mongoose.Schema ({
  email: String,
  password: String
});


LifterSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"]});


const Lifter = new mongoose.model("Lifter", LifterSchema);

app.get("/", function(req, res){
  res.render("../public/html/index")
})

app.get("/register", function(req, res){
  res.render("../public/html/register")
})

app.post("/register", function(req, res){
  const newLifter = new Lifter ({
    email: req.body.email,
    password: req.body.password
  });

  newLifter.save(function(err){
    if(err) {
      console.log(err);
    } else {
      res.render("../public/html/myProfile")
    }
  })
})

app.post("/", function(req, res){
  const email = req.body.email;
  const password = req.body.password;

  Lifter.findOne({email: email}, function(err, foundLifter){
    if (err) {
      console.log(err);
    } else {
      if (foundLifter) {
        if (foundLifter.password === password) {
          res.render("../public/html/myProfile")
        }
      }
    }
  })
});

app.get("/myProfile", function(req, res){
  res.render("../public/html/myProfile")
})

app.get("/matching", function(req, res){
  res.render("../public/html/matching")
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

app.get("/underConstruction", function(req, res){
  res.render("../public/html/underConstruction")
})


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started on port 3000");
});
