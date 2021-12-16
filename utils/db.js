const mysql = require('mysql2');

const pool = mysql.createPool({
    host : 'PriyaRamya11.mysql.pythonanywhere-services.com',
    user : 'PriyaRamya11',
    password : 'Priya@383',
    database : 'priya'
})

module.exports = pool.promise();