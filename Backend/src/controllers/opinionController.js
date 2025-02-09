const Opinion = require('../models/opinion');

// Función para obtener todas las opiniones
const obtenerOpiniones = async (req, res) => {
    try {
        const opiniones = await Opinion.findAll();
        res.status(200).json(opiniones);
    } catch (error) {
        console.error('Error al obtener las opiniones:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Función para crear una opinión
const crearOpinion = async (req, res) => {
    try {
        const { contenido, usuarioId, cancionId } = req.body;

        if (!contenido || !usuarioId || !cancionId) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
        }

        const nuevaOpinion = await Opinion.create({ contenido, usuarioId, cancionId });
        res.status(201).json(nuevaOpinion);
    } catch (error) {
        console.error('Error al crear la opinión:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Función para actualizar una opinión
const actualizarOpinion = async (req, res) => {
    try {
        const { id } = req.params;
        const { contenido } = req.body;

        const opinion = await Opinion.findByPk(id);
        if (!opinion) {
            return res.status(404).json({ mensaje: 'Opinión no encontrada' });
        }

        opinion.contenido = contenido || opinion.contenido;

        await opinion.save();
        res.status(200).json(opinion);
    } catch (error) {
        console.error('Error al actualizar la opinión:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Función para eliminar una opinión
const eliminarOpinion = async (req, res) => {
    try {
        const { id } = req.params;

        const opinion = await Opinion.findByPk(id);
        if (!opinion) {
            return res.status(404).json({ mensaje: 'Opinión no encontrada' });
        }

        await opinion.destroy();
        res.status(200).json({ mensaje: 'Opinión eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la opinión:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Exportar las funciones
module.exports = { obtenerOpiniones, crearOpinion, actualizarOpinion, eliminarOpinion };
