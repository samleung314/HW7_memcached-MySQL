// app.js
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var url = require('url');

var mysql = require('./mysql');

//create express app
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

///hw7?club=HOU&pos=M
app.get('/hw7', function (req, res) {
    var q = url.parse(req.url, true).query;
    console.log("URL: " + req.url);
    console.log("CLUB: " + q.club);
    console.log("POS: " + q.pos);

    con.query(
        'SELECT player, club, pos, a, AVG(a) as avg FROM assists WHERE club=' + '"HOU"' + ' AND pos=' + '"M"' +
        ' ORDER BY a DESC LIMIT 1',
    
    function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
    res.status(200).json({
        club: q.club,
        pos: q.pos,
        max_assists: result.a,
        player: result.player,
        avg_assists: result.avg
      });
})

var port = process.env.PORT || 80;
var server = app.listen(port, function () {
    console.log("HW7 listening on port: " + port)
})

module.exports = app;