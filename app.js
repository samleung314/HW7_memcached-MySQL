// app.js
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//create express app
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

///hw7?club=HOU&pos=M
app.get('/hw7', function (req, res) {
    var q = url.parse(req.url, true).query;
    console.log("CLUB: " + q.club);
    console.log("POS: " + q.pos);
})

var port = process.env.PORT || 80;
var server = app.listen(port, function () {
    console.log("HW7 listening on port: " + port)
 })

module.exports = app;