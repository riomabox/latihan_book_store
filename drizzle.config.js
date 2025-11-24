require('dotenv/config');
const { defineConfig } = require('drizzle-kit');

module.exports = defineConfig({
	dialect: 'postgresql',
	out: './drizzle',
	schema: './models/index.js',
	dbCredentials: {
		url: process.env.DATABASE_URL
	}
});