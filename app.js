var express = require("express");
var app = express();
var path = require("path");

app.use('/', express.static(__dirname + "/public/views/"));
app.use('/', express.static(__dirname + "/public/styles/"));
app.use('/', express.static(__dirname + "/public/images/"));

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + 'index.html'));
});

app.get("/development", function(req, res) {
	res.sendFile(path.join(__dirname + '/public/views/development.html'));
});

app.get("/music", function(req, res) {
	res.sendFile(path.join(__dirname+"/music.html"));
});

app.get("/about", function(req, res) {
	res.sendFile(path.join(__dirname+"/about.html"));
});

app.get("/contact", function(req, res) {
	res.sendFile(path.join(__dirname+"/contact.html"));
});

app.listen(3000, process.env.IP, function() {
	console.log("Server running on 3000");
});