var mysql = require('mysql');

module.exports = con;

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