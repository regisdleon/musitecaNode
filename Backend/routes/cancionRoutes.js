const express = require('express');
const router = express.Router();
const cancionController = require('../controllers/cancionController'); // Importar el controlador
const verificarToken = require('../middleware/verificarToken'); // Middleware de autenticación

/**
 * @swagger
 * /api/canciones:
 *   get:
 *     summary: Obtener todas las canciones
 *     description: Devuelve una lista de todas las canciones.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de canciones obtenida exitosamente.
 *       401:
 *         description: Acceso denegado.
 */
router.get('/canciones', verificarToken, cancionController.obtenerCanciones);

/**
 * @swagger
 * /api/canciones/{id}:
 *   get:
 *     summary: Obtener una canción por su ID
 *     description: Devuelve una canción específica por su ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la canción a obtener.
 *     responses:
 *       200:
 *         description: Canción obtenida exitosamente.
 *       404:
 *         description: Canción no encontrada.
 */
router.get('/canciones/:id', verificarToken, cancionController.obtenerCancionPorId);

/**
 * @swagger
 * /api/canciones:
 *   post:
 *     summary: Crear una canción
 *     description: Permite crear una nueva canción.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Datos de la nueva canción.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             titulo:
 *               type: string
 *             albumId:
 *               type: integer
 *     responses:
 *       201:
 *         description: Canción creada exitosamente.
 *       400:
 *         description: Todos los campos son obligatorios.
 */
router.post('/canciones', verificarToken, cancionController.crearCancion);

/**
 * @swagger
 * /api/canciones/{id}:
 *   put:
 *     summary: Actualizar una canción
 *     description: Permite actualizar la información de una canción existente.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la canción a actualizar.
 *       - in: body
 *         name: body
 *         description: Datos actualizados de la canción.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             titulo:
 *               type: string
 *             albumId:
 *               type: integer
 *     responses:
 *       200:
 *         description: Canción actualizada exitosamente.
 *       404:
 *         description: Canción no encontrada.
 */
router.put('/canciones/:id', verificarToken, cancionController.actualizarCancion);

/**
 * @swagger
 * /api/canciones/{id}:
 *   delete:
 *     summary: Eliminar una canción
 *     description: Permite eliminar una canción existente.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la canción a eliminar.
 *     responses:
 *       200:
 *         description: Canción eliminada exitosamente.
 *       404:
 *         description: Canción no encontrada.
 */
router.delete('/canciones/:id', verificarToken, cancionController.eliminarCancion);

module.exports = router;
