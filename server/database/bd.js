const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'159753',
    database:'auth_app'
    
    
});


module.exports  = connection;