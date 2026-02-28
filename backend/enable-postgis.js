const { Client } = require('pg');
require('dotenv').config();

async function enablePostgis() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        await client.connect();
        console.log('Connected to database. Enabling PostGIS...');
        await client.query('CREATE EXTENSION IF NOT EXISTS postgis;');
        console.log('PostGIS extension enabled successfully.');
    } catch (err) {
        console.error('Error enabling PostGIS:', err);
    } finally {
        await client.end();
    }
}

enablePostgis();
