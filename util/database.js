const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	database: 'shop_web_app',
	password: process.env.DB_PASSWORD,
});

module.exports = pool.promise();
