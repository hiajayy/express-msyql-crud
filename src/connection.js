const mysql = require('mysql2');
require('dotenv').config({ path: __dirname + "/.env" });
const connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
}).promise();

module.exports = connection;