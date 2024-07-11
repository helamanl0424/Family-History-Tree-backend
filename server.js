const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 5000;  // Port where the server will listen

// Middleware to parse JSON bodies
app.use(express.json());

// Setting up PostgreSQL connection
const pool = new Pool({
  user: 'postgres',     // Replace with your PostgreSQL username
  host: 'localhost',        // Database host
  database: 'family_tree',  // Replace with your database name
  password: '!Pass424', // Replace with your database password
  port: 5432,               // PostgreSQL port, typically 5432 by default
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