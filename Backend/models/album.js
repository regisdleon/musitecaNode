const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database");
const Artista = require("./artista");

const Album = sequelize.define("album", {
  nombre_album: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_album:{
    type:DataTypes.STRING,
    allowNull: false,
  },
  duracion_album: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cantidad_canciones: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: true,
  paranoid: true,
});

Artista.hasMany(Album, {
  foreignKey: 'id_artista',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Album.belongsTo(Artista, {
  foreignKey: 'id_artista',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

module.exports = Album;