const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/database');

const Artista = sequelize.define("artista", {
    nombre_artistico: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    inicio_actividad: {
        type: DataTypes.STRING, 
        allowNull: false,
    },

    pais: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true,
    paranoid: true,
});

module.exports = Artista;