const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController'); // Importar el controlador
const verificarToken = require('../middleware/verificarToken'); // Middleware de autenticación

/**
 * @swagger
 * /api/albums:
 *   get:
 *     summary: Obtener todos los álbumes
 *     description: Devuelve una lista de todos los álbumes.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de álbumes obtenida exitosamente.
 *       401:
 *         description: Acceso denegado.
 */
router.get('/albums', verificarToken, albumController.obtenerAlbums);

/**
 * @swagger
 * /api/albums/{id}:
 *   get:
 *     summary: Obtener un álbum por su ID
 *     description: Devuelve un álbum específico por su ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del álbum a obtener.
 *     responses:
 *       200:
 *         description: Álbum obtenido exitosamente.
 *       404:
 *         description: Álbum no encontrado.
 */
router.get('/albums/:id', verificarToken, albumController.obtenerAlbumPorId);

/**
 * @swagger
 * /api/albums:
 *   post:
 *     summary: Crear un álbum
 *     description: Permite crear un nuevo álbum.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Datos del nuevo álbum.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             nombre:
 *               type: string
 *             artistaId:
 *               type: integer
 *     responses:
 *       201:
 *         description: Álbum creado exitosamente.
 *       400:
 *         description: Todos los campos son obligatorios.
 */
router.post('/albums', verificarToken, albumController.crearAlbum);

/**
 * @swagger
 * /api/albums/{id}:
 *   put:
 *     summary: Actualizar un álbum
 *     description: Permite actualizar la información de un álbum existente.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del álbum a actualizar.
 *       - in: body
 *         name: body
 *         description: Datos actualizados del álbum.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             nombre:
 *               type: string
 *             artistaId:
 *               type: integer
 *     responses:
 *       200:
 *         description: Álbum actualizado exitosamente.
 *       404:
 *         description: Álbum no encontrado.
 */
router.put('/albums/:id', verificarToken, albumController.actualizarAlbum);

/**
 * @swagger
 * /api/albums/{id}:
 *   delete:
 *     summary: Eliminar un álbum
 *     description: Permite eliminar un álbum existente.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del álbum a eliminar.
 *     responses:
 *       200:
 *         description: Álbum eliminado exitosamente.
 *       404:
 *         description: Álbum no encontrado.
 */
router.delete('/albums/:id', verificarToken, albumController.eliminarAlbum);

module.exports = router;
