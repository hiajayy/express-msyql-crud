const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'express_crud'
});

connection.connect((error) => {
    if (!error) {
        console.log("Database connected");
    } else {
        console.log(error);
    }
});

module.exports = connection;