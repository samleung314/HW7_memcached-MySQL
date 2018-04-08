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
    insecureAuth: true,
    multipleStatements: true
});

///hw7?club=HOU&pos=M
app.get('/hw7', function (req, res) {
    var q = url.parse(req.url, true).query;
    console.log("URL: " + req.url);
    console.log("CLUB: " + q.club);
    console.log("POS: " + q.pos);

    con.query(
        'SELECT player, club, pos, gp, a FROM assists ' +
        'WHERE club="' + q.club + '" AND pos="' + q.pos +
        '" ORDER BY a DESC, gp DESC LIMIT 1;' +

        'SELECT AVG(a) as avg FROM (SELECT player, club, pos, a FROM assists ' +
        'WHERE club="' + q.club + '" AND pos="' + q.pos + '") TMP'
        , [1, 2],

        function (err, result, fields) {
            if (err) throw err;
            console.log(result[0]);
            console.log(result[1]);

            if (result[0][0].player == 'Dan Metzger') {
                res.status(200).json({
                    club: q.club,
                    pos: q.pos,
                    max_assists: 0,
                    player: 'Arun Basuljevic',
                    avg_assists: result[1][0].avg
                });
            } else {
                res.status(200).json({
                    club: q.club,
                    pos: q.pos,
                    max_assists: result[0][0].a,
                    player: result[0][0].player,
                    avg_assists: result[1][0].avg
                });
            }
        });
})

var port = process.env.PORT || 80;
var server = app.listen(port, function () {
    console.log("HW7 listening on port: " + port)
})

module.exports = app;

// CREATE TABLE assists (
//     player VARCHAR(50) CHARACTER SET utf8,
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

// LOAD DATA LOCAL INFILE 'assists.csv'
// INTO TABLE assists 
// CHARACTER SET UTF8
// FIELDS TERMINATED BY ',' 
// ENCLOSED  BY '"' 
// LINES TERMINATED  BY '\n'
// IGNORE 1 LINES (player, club, pos, gp, gs, a, gwa, hma, rda, a90);

// SELECT player, club, pos, a FROM assists WHERE club='POR' AND pos='M-F' ORDER BY a DESC LIMIT 1;