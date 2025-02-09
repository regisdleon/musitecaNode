const Album = require('../models/album');
const Artista = require('../models/artista');

// Función para obtener todos los álbumes
const obtenerAlbums = async (req, res) => {
    try {
        const albums = await Album.findAll({
            include: [
                {
                    model: Artista, // Debes importar el modelo Artista
                }
            ]
        });
        res.status(200).json(albums);
    } catch (error) {
        console.error('Error al obtener los álbumes:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Función para crear un álbum
const crearAlbum = async (req, res) => {
    try {
        const { nombre_album, fecha_album, duracion_album, cantidad_canciones, tipo, id_artista } = req.body;

        if (!nombre_album || !fecha_album || !duracion_album || !cantidad_canciones || !tipo || !id_artista) {
            return res.status(400).json({ mensaje: 'Todos los campos son requeridos' });
        }

        const artista = await Artista.findByPk(id_artista);
        if (!artista) {
            return res.status(404).json({ mensaje: 'Artista no encontrado' });
        }

        const nuevoAlbum = await Album.create(req.body);
        res.status(201).json(nuevoAlbum);
    } catch (error) {
        console.error('Error al crear el álbum:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Función para actualizar un álbum
const actualizarAlbum = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_album, fecha_album, duracion_album, cantidad_canciones, tipo, id_artista } = req.body;

        const album = await Album.findByPk(id);
        if (!album) {
            return res.status(404).json({ mensaje: 'Álbum no encontrado' });
        }

        if (id_artista) {
            const artista = await Artista.findByPk(id_artista);
            if (!artista) {
                return res.status(404).json({ mensaje: 'Artista no encontrado' });
            }
        }

        album.nombre_album = nombre_album || album.nombre_album;
        album.fecha_album = fecha_album || album.fecha_album;
        album.duracion_album = duracion_album || album.duracion_album;
        album.cantidad_canciones = cantidad_canciones || album.cantidad_canciones;
        album.tipo = tipo || album.tipo;
        album.id_artista = id_artista || album.id_artista;

        await album.save();
        res.status(200).json(album);
    } catch (error) {
        console.error('Error al actualizar el álbum:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Función para eliminar un álbum
const eliminarAlbum = async (req, res) => {
    try {
        const { id } = req.params;

        const album = await Album.findByPk(id);
        if (!album) {
            return res.status(404).json({ mensaje: 'Álbum no encontrado' });
        }

        await album.destroy();
        res.status(200).json({ mensaje: 'Álbum eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el álbum:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Función para obtener un álbum por su ID
const obtenerAlbumPorId = async (req, res) => {
    try {
      const { id } = req.params;
      const album = await Album.findByPk(id, {
        include: [
          {
            model: Artista, // Debes importar el modelo Artista
          }
        ]
      });
      if (!album) {
        return res.status(404).json({ mensaje: 'Álbum no encontrado' });
      }
      res.status(200).json(album);
    } catch (error) {
      console.error('Error al obtener el álbum:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };

// Exportar las funciones
module.exports = { obtenerAlbums, crearAlbum, actualizarAlbum, eliminarAlbum,obtenerAlbumPorId };
