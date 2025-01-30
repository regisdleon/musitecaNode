const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database");

const Usuario = sequelize.define("usuario", {
  nombre_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoid: true,
});

module.exports = Usuario; // Exportar solo el modelo