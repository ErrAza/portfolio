var express = require("express");
var app = express();
var sassMiddleware = require('node-sass-middleware')
var path = require("path");
var mongoose = require('mongoose');

// Sass
app.use(
     sassMiddleware({
         src: __dirname + '/sass', 
         dest: __dirname + '/public/styles'
     })
  );   

// Static Dirs

app.use('/', express.static(__dirname + "/public/styles/"));
app.use('/', express.static(__dirname + "/public/images/"));

// View Engine Setup

app.set('view engine', 'pug');
app.set('views', './views');

// DB Connect
mongoose.connect("mongodb://localhost/portfoliodb");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function() {
  console.log("DB connected");
  db.db.listCollections().toArray(function(err, names){
  	names.forEach(function(e) {
            console.log("--->>", e.name);
        });
  });
});

var devPostSchema = new mongoose.Schema({
	title: String,
	thumbnail: String
});

var DevPost = mongoose.model("Devpost", devPostSchema);


// Routing

app.get("/", function(req, res) {
	res.render("home");
});

app.get("/development", function(req, res) {
	DevPost.find({}, function(err, devposts) {
		if (err) {
			console.log(err);
		} else {
			console.log(devposts);
			res.render("dev", {devposts: devposts});
		}
	})
});

app.get("/music", function(req, res) {
	res.render('music');
});

app.get("/about", function(req, res) {
	res.render('about');
});

app.get("/contact", function(req, res) {
	res.render('contact');
});

// Listening

app.listen(80, process.env.IP, function() {
	console.log("Server running on 3000");
});
