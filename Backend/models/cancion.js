const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database");
const Album = require('./album');

const Cancion = sequelize.define("cancion", {
  nombre_cancion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genero_cancion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
duracion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoid: true,
});

// Relaciones
Album.hasMany(Cancion, {
  foreignKey: 'id_album',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Cancion.belongsTo(Album, {
  foreignKey: 'id_album',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

module.exports = Cancion;