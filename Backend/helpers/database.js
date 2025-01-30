const { Sequelize } = require('sequelize');
const dotenv = require('dotenv').config();

const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_USER = process.env.DB_USER;
const DB_HOST = process.env.DB_HOST;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
    logging: false, // Desactiva los logs de Sequelize en consola
});

sequelize.authenticate()
    .then(() => {
        console.log('Conexión establecida correctamente.');
    })
    .catch((err) => {
        console.error('Error al conectarse a la base de datos:', err);
    });

module.exports = sequelize;