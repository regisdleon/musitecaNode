const Cancion = require('../models/cancion');
const Album = require('../models/album');

// Función para obtener todas las canciones
const obtenerCanciones = async (req, res) => {
    try {
        const canciones = await Cancion.findAll({
            include: [{ model: Album }]
        });
        res.status(200).json(canciones);
    } catch (error) {
        console.error('Error al obtener las canciones:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Función para crear una canción
const crearCancion = async (req, res) => {
    try {
        const { nombre_cancion, genero_cancion, duracion, id_album, archivo_cancion } = req.body;
        
        if (!nombre_cancion || !genero_cancion || !duracion || !id_album || !archivo_cancion) {
            return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
        }

        const album = await Album.findByPk(id_album);
        if (!album) {
            return res.status(404).json({ mensaje: 'Álbum no encontrado' });
        }

        const nuevaCancion = await Cancion.create({
            nombre_cancion,
            genero_cancion,
            duracion,
            archivo_cancion,
            id_album
        });

        res.status(201).json({
            ...nuevaCancion.toJSON(),
            album
        });
    } catch (error) {
        console.error('Error al crear la canción:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Función para actualizar una canción
const actualizarCancion = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_cancion, genero_cancion, duracion, id_album } = req.body;

        if (!nombre_cancion && !genero_cancion && !duracion && !id_album && !archivo_cancion) {
            return res.status(400).json({ mensaje: 'No se han proporcionado cambios' });
        }

        const cancion = await Cancion.findByPk(id);
        if (!cancion) {
            return res.status(404).json({ mensaje: 'Canción no encontrada' });
        }

        if (id_album) {
            const album = await Album.findByPk(id_album);
            if (!album) {
                return res.status(404).json({ mensaje: 'Álbum no encontrado' });
            }
        }

        cancion.nombre_cancion = nombre_cancion || cancion.nombre_cancion;
        cancion.genero_cancion = genero_cancion || cancion.genero_cancion;
        cancion.duracion = duracion || cancion.duracion;
        cancion.id_album = id_album || cancion.id_album;
        cancion.archivo_cancion = archivo_cancion || cancion.archivo_cancion;

        await cancion.save();

        const album = await Album.findByPk(cancion.id_album);
        res.status(200).json({
            ...cancion.toJSON(),
            album
        });
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

// Función para cargar un archivo de música
const cargarArchivoMusica = async (req, res) => {
    try {
      const { id } = req.params;
      const archivo = req.file;
  
      if (!archivo) {
        return res.status(400).json({ mensaje: 'No se ha proporcionado un archivo' });
      }
  
      if (archivo.mimetype !== 'audio/mpeg' && archivo.mimetype !== 'audio/mp3') {
        return res.status(400).json({ mensaje: 'Solo se permiten archivos de audio con extensión .mp3' });
      }
  
      const cancion = await Cancion.findByPk(id);
      if (!cancion) {
        return res.status(404).json({ mensaje: 'Canción no encontrada' });
      }
  
      cancion.archivo_cancion = archivo.filename;
      await cancion.save();
  
      res.status(201).json({ mensaje: 'Archivo de música cargado exitosamente' });
    } catch (error) {
      console.error('Error al cargar el archivo de música:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };
  
  // Función para descargar un archivo de música
  const descargarArchivoMusica = async (req, res) => {
    try {
      const { id } = req.params;
  
      const cancion = await Cancion.findByPk(id);
      if (!cancion) {
        return res.status(404).json({ mensaje: 'Canción no encontrada' });
      }
  
      if (!cancion.archivo_cancion) {
        return res.status(404).json({ mensaje: 'No se ha cargado un archivo de música para esta canción' });
      }
  
      const archivo = path.join(__dirname, '../uploads', cancion.archivo_cancion);
      res.download(archivo, cancion.archivo_cancion);
    } catch (error) {
      console.error('Error al descargar el archivo de música:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };

// Exportar las funciones
module.exports = { obtenerCanciones, crearCancion, actualizarCancion, eliminarCancion, descargarArchivoMusica, cargarArchivoMusica };