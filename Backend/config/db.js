// config/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres', // Usuario de PostgreSQL
  host: process.env.DB_HOST || 'localhost', // Host de la base de datos
  database: process.env.DB_NAME || 'MusitecaNode', // Nombre de la base de datos
  password: process.env.DB_PASSWORD || '123456', // Contraseña de PostgreSQL
  port: process.env.DB_PORT || 5432, // Puerto de PostgreSQL
});

module.exports = pool;