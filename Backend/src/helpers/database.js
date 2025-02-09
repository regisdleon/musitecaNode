// helpers/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
          require: true, // Obligatorio
          rejectUnauthorized: false, // Ignora certificados no confiables
          sslmode: 'require', // Fuerza SSL
          native: true, // Habilita SSL nativo de PostgreSQL
        },
      },
    logging: false
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ Conexión SSL establecida con Supabase'))
  .catch(err => console.error('❌ Fallo SSL:', err));

module.exports = sequelize;