const mysql = require('mysql2');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'express_crud'
}).promise();

module.exports = connection;