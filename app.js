var express = require("express");
var app = express();
var path = require("path");

app.use('/', express.static(__dirname + "/public/styles/"));
app.use('/', express.static(__dirname + "/public/images/"));

app.set('view engine', 'pug');
app.set('views', './views');

app.get("/", function(req, res) {
	res.render("home");
});

app.get("/development", function(req, res) {
	res.render('dev');
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

app.listen(3000, process.env.IP, function() {
	console.log("Server running on 3000");
});