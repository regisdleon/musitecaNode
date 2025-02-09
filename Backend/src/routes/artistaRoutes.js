const express = require('express');
const router = express.Router();
const artistaController = require('../controllers/artistaController'); // Importar el controlador
const verificarToken = require('../middleware/verificarToken'); // Middleware de autenticación
const verificarRol = require('../middleware/verificarRol'); // Middleware de roles

/**
 * @swagger
 * /api/artistas:
 *   get:
 *     summary: Obtener todos los artistas
 *     description: Devuelve una lista de todos los artistas.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de artistas obtenida exitosamente.
 *       401:
 *         description: Acceso denegado.
 */
router.get('/artistas', verificarToken, artistaController.obtenerArtistas);

/**
 * @swagger
 * /api/artistas:
 *   post:
 *     summary: Crear un artista
 *     description: Permite crear un nuevo artista.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Datos del nuevo artista.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             nombre_artistico:
 *               type: string
 *             inicio_actividad:
 *               type: string
 *             pais:
 *               type: string
 *     responses:
 *       201:
 *         description: Artista creado exitosamente.
 *       400:
 *         description: Todos los campos son obligatorios.
 */
router.post('/artistas', verificarToken, artistaController.crearArtista);

/**
 * @swagger
 * /api/artistas/{id}:
 *   put:
 *     summary: Actualizar un artista
 *     description: Permite actualizar la información de un artista existente.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del artista a actualizar.
 *       - in: body
 *         name: body
 *         description: Datos actualizados del artista.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             nombre_artistico:
 *               type: string
 *             inicio_actividad:
 *               type: string
 *             pais:
 *               type: string
 *     responses:
 *       200:
 *         description: Artista actualizado exitosamente.
 *       404:
 *         description: Artista no encontrado.
 */
router.put('/artistas/:id', verificarToken, artistaController.actualizarArtista);

/**
 * @swagger
 * /api/artistas/{id}:
 *   delete:
 *     summary: Eliminar un artista
 *     description: Permite eliminar un artista existente.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del artista a eliminar.
 *     responses:
 *       200:
 *         description: Artista eliminado exitosamente.
 *       404:
 *         description: Artista no encontrado.
 */
router.delete('/artistas/:id', verificarToken, verificarRol(['admin']), artistaController.eliminarArtista);

/**
 * @swagger
 * /api/artistas/{id}:
 *   get:
 *     summary: Obtener un artista por su ID
 *     description: Devuelve un artista específico por su ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del artista a obtener.
 *     responses:
 *       200:
 *         description: Artista obtenido exitosamente.
 *       404:
 *         description: Artista no encontrado.
 */
router.get('/artistas/:id', verificarToken, artistaController.obtenerArtistaPorId);

module.exports = router;
