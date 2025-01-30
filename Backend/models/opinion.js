const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database");
const Usuario = require("./usuario");
const Cancion = require('./cancion');

const Opinion = sequelize.define("opinion", {
  opinion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_opinion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoid: true,
});

// Relaciones
Cancion.hasMany(Opinion, {
  foreignKey: 'id_cancion',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Opinion.belongsTo(Cancion, {
  foreignKey: 'id_cancion',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Usuario.hasMany(Opinion, {
  foreignKey: 'id_usuario',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Opinion.belongsTo(Usuario, {
  foreignKey: 'id_usuario',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

module.exports = Opinion;