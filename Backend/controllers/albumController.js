const Album = require('../models/album');

// Función para obtener todos los álbumes
const obtenerAlbums = async (req, res) => {
    try {
        const albums = await Album.findAll();
        res.status(200).json(albums);
    } catch (error) {
        console.error('Error al obtener los álbumes:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Función para crear un álbum
const crearAlbum = async (req, res) => {
    try {
        const { nombre, artistaId } = req.body;

        if (!nombre || !artistaId) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
        }

        const nuevoAlbum = await Album.create({ nombre, artistaId });
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
        const { nombre, artistaId } = req.body;

        const album = await Album.findByPk(id);
        if (!album) {
            return res.status(404).json({ mensaje: 'Álbum no encontrado' });
        }

        album.nombre = nombre || album.nombre;
        album.artistaId = artistaId || album.artistaId;

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

// Exportar las funciones
module.exports = { obtenerAlbums, crearAlbum, actualizarAlbum, eliminarAlbum };
