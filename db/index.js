const { drizzle } = require('drizzle-orm/node-postgres');
require('dotenv/config');
const { Pool } = require('pg');

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

pool.query('SELECT NOW()', (err, res) => {
	if (err) {
		console.error('Database connection failed:', err);
	} else {
		console.log('Database connected:', res.rows[0]);
	}
});

const db = drizzle(pool);

module.exports = db;