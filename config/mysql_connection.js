const mysql = require('mysql');

function userSchema() {
    const connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'Xtu78963214',
        database: 'test'
    });
    return connection;
}

function profileSchema() {
    const connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'Xtu78963214',
        database: 'test'
    });
    return connection;
}


module.exports.userSchema = userSchema;
module.exports.profileSchema = profileSchema;
