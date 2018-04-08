// app.js
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var url = require('url');
var mysql = require('mysql');

//create express app
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hw7',
    insecureAuth: true
});

///hw7?club=HOU&pos=M
app.get('/hw7', function (req, res) {
    var q = url.parse(req.url, true).query;
    console.log("URL: " + req.url);
    console.log("CLUB: " + q.club);
    console.log("POS: " + q.pos);

    con.query(
        'SELECT player, club, pos, a, AVG(a) as avg FROM assists WHERE club="' + q.club + '" AND pos="' + q.pos +
        '" GROUP BY player, club, a ORDER BY a DESC LIMIT 1',

        function (err, result, fields) {
            if (err) throw err;
            console.log(result);

            res.status(200).json({
                club: q.club,
                pos: q.pos,
                max_assists: result[0].a,
                player: result[0].player,
                avg_assists: result[0].avg
            });
        });
})

var port = process.env.PORT || 80;
var server = app.listen(port, function () {
    console.log("HW7 listening on port: " + port)
})

module.exports = app;

// CREATE TABLE assists (
//     player VARCHAR(50) ,
//     club VARCHAR(50) ,
//     pos VARCHAR(50) ,
//     gp INT ,
//     gs INT ,
//     a INT ,
//     gwa INT ,
//     hma INT ,
//     rda INT ,
//     a90 DECIMAL(2,2),
//     PRIMARY KEY (player)
// )

//load data local infile 'assists.csv' into table assists fields terminated by ',' enclosed by '"' lines terminated by '\n' IGNORE 1 LINES (player, club, pos, gp, gs, a, gwa, hma, rda, a90);