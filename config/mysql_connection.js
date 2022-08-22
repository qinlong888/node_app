const mysql = require('mysql');

function createConnection() {
    const connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'Xtu78963214',
        database: 'test'
    });
    return connection;
}


module.exports.createConnection = createConnection