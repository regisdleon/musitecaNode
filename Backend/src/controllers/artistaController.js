const Artista = require('../models/artista');

// Función para obtener todos los artistas
const obtenerArtistas = async (req, res) => {
    try {
        const artistas = await Artista.findAll();
        res.status(200).json(artistas);
    } catch (error) {
        console.error('Error al obtener los artistas:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Función para crear un artista
const crearArtista = async (req, res) => {
    try {
        const { nombre_artistico, inicio_actividad, pais } = req.body;

        if (!nombre_artistico || !inicio_actividad || !pais) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
        }

        // Validar que inicio_actividad sea un string de 4 dígitos
        const añoRegex = /^\d{4}$/; // Formato de 4 dígitos
        if (!añoRegex.test(inicio_actividad)) {
            return res.status(400).json({ mensaje: 'El formato de inicio_actividad debe ser un año de 4 dígitos' });
        }

        const nuevoArtista = await Artista.create({
            nombre_artistico,
            inicio_actividad,
            pais
        });

        res.status(201).json(nuevoArtista);
    } catch (error) {
        console.error('Error al crear un artista:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Función para actualizar un artista
const actualizarArtista = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_artistico, inicio_actividad, pais } = req.body;

        const artista = await Artista.findByPk(id);
        if (!artista) {
            return res.status(404).json({ mensaje: 'Artista no encontrado' });
        }

        artista.nombre_artistico = nombre_artistico;
        artista.inicio_actividad = inicio_actividad;
        artista.pais = pais;

        await artista.save();

        res.status(200).json(artista);
    } catch (error) {
        console.error('Error al actualizar el artista:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Función para eliminar un artista
const eliminarArtista = async (req, res) => {
    try {
        const { id } = req.params;

        const artista = await Artista.findByPk(id);
        if (!artista) {
            return res.status(404).json({ mensaje: 'Artista no encontrado' });
        }

        await artista.destroy();

        res.status(200).json({ mensaje: 'Artista eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el artista:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Función para obtener un artista por su ID
const obtenerArtistaPorId = async (req, res) => {
    try {
      const { id } = req.params;
      const artista = await Artista.findByPk(id);
      if (!artista) {
        return res.status(404).json({ mensaje: 'Artista no encontrado' });
      }
      res.status(200).json(artista);
    } catch (error) {
      console.error('Error al obtener el artista:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };

// Exportar las funciones
module.exports = { obtenerArtistas, crearArtista, actualizarArtista, eliminarArtista, obtenerArtistaPorId };
