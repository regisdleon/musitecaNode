const Cancion = require('../models/cancion');

// Función para obtener todas las canciones
const obtenerCanciones = async (req, res) => {
    try {
        const canciones = await Cancion.findAll();
        res.status(200).json(canciones);
    } catch (error) {
        console.error('Error al obtener las canciones:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Función para crear una canción
const crearCancion = async (req, res) => {
    try {
        const { titulo, albumId } = req.body;

        if (!titulo || !albumId) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
        }

        const nuevaCancion = await Cancion.create({ titulo, albumId });
        res.status(201).json(nuevaCancion);
    } catch (error) {
        console.error('Error al crear la canción:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Función para actualizar una canción
const actualizarCancion = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, albumId } = req.body;

        const cancion = await Cancion.findByPk(id);
        if (!cancion) {
            return res.status(404).json({ mensaje: 'Canción no encontrada' });
        }

        cancion.titulo = titulo || cancion.titulo;
        cancion.albumId = albumId || cancion.albumId;

        await cancion.save();
        res.status(200).json(cancion);
    } catch (error) {
        console.error('Error al actualizar la canción:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Función para eliminar una canción
const eliminarCancion = async (req, res) => {
    try {
        const { id } = req.params;

        const cancion = await Cancion.findByPk(id);
        if (!cancion) {
            return res.status(404).json({ mensaje: 'Canción no encontrada' });
        }

        await cancion.destroy();
        res.status(200).json({ mensaje: 'Canción eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la canción:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Exportar las funciones
module.exports = { obtenerCanciones, crearCancion, actualizarCancion, eliminarCancion };
