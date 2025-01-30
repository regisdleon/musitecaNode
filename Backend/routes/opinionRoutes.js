const express = require('express');
const router = express.Router();
const opinionController = require('../controllers/opinionController'); // Importar el controlador
const verificarToken = require('../middleware/verificarToken'); // Middleware de autenticación

/**
 * @swagger
 * /api/opiniones:
 *   get:
 *     summary: Obtener todas las opiniones
 *     description: Devuelve una lista de todas las opiniones.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de opiniones obtenida exitosamente.
 *       401:
 *         description: Acceso denegado.
 */
router.get('/opiniones', verificarToken, opinionController.obtenerOpiniones);

/**
 * @swagger
 * /api/opiniones:
 *   post:
 *     summary: Crear una opinión
 *     description: Permite crear una nueva opinión.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Datos de la nueva opinión.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             contenido:
 *               type: string
 *             usuarioId:
 *               type: integer
 *             cancionId:
 *               type: integer
 *     responses:
 *       201:
 *         description: Opinión creada exitosamente.
 *       400:
 *         description: Todos los campos son obligatorios.
 */
router.post('/opiniones', verificarToken, opinionController.crearOpinion);

/**
 * @swagger
 * /api/opiniones/{id}:
 *   put:
 *     summary: Actualizar una opinión
 *     description: Permite actualizar la información de una opinión existente.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la opinión a actualizar.
 *       - in: body
 *         name: body
 *         description: Datos actualizados de la opinión.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             contenido:
 *               type: string
 *     responses:
 *       200:
 *         description: Opinión actualizada exitosamente.
 *       404:
 *         description: Opinión no encontrada.
 */
router.put('/opiniones/:id', verificarToken, opinionController.actualizarOpinion);

/**
 * @swagger
 * /api/opiniones/{id}:
 *   delete:
 *     summary: Eliminar una opinión
 *     description: Permite eliminar una opinión existente.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la opinión a eliminar.
 *     responses:
 *       200:
 *         description: Opinión eliminada exitosamente.
 *       404:
 *         description: Opinión no encontrada.
 */
router.delete('/opiniones/:id', verificarToken, opinionController.eliminarOpinion);

module.exports = router;
