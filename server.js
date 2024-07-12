const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = 5000;  // Port where the server will listen

// Middleware to parse JSON bodies
app.use(express.json());

// Setting up PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,         // Replace with your PostgreSQL username
  host: process.env.DB_HOST,         // Database host
  database: process.env.DB_NAME,     // Replace with your database name
  password: process.env.DB_PASSWORD, // Replace with your database password
  port: process.env.DB_PORT          // PostgreSQL port, typically 5432 by default
});

// Example route: Get all persons from your database
app.get('/persons', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM persons');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});