// backend/createTable.js
const pool = require('./db');

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
  );
`;

pool.query(createTableQuery)
  .then(res => {
    console.log('Table is successfully created');
    pool.end();
  })
  .catch(err => {
    console.error('Error executing query', err.stack);
    pool.end();
  });
