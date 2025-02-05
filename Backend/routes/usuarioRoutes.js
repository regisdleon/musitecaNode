const express = require('express');
const router = express.Router();
const verificarToken = require('../middleware/verificarToken');
const usuarioController = require('../controllers/usuarioController');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Permite a un usuario iniciar sesión y obtener un token JWT.
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Credenciales del usuario.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             nombre_usuario:
 *               type: string
 *             contrasena:
 *               type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *       400:
 *         description: Nombre de usuario o contraseña incorrectos.
 */
router.post('/login', async (req, res) => {
    const { nombre_usuario, contrasena } = req.body;
    console.log('Cuerpo de la solicitud:', req.body); // Log agregado

    // Validar la entrada del usuario
    if (!nombre_usuario || !contrasena) {
        return res.status(400).json({ mensaje: 'Nombre de usuario y contraseña son obligatorios' });
    }

    const usuario = await Usuario.findOne({ where: { nombre_usuario } });

    // Verificar si el usuario existe
    if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Comparar la contraseña proporcionada con la almacenada
    const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
    
    if (!contrasenaValida) {
        return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const response = await usuarioController.iniciarSesion(nombre_usuario, contrasena)
        
    res.json(response)
});

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Devuelve una lista de todos los usuarios.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente.
 *       401:
 *         description: Acceso denegado.
 */
router.get('/usuarios', verificarToken, usuarioController.obtenerUsuarios);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     description: Permite crear un nuevo usuario.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Datos del nuevo usuario.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             nombre_usuario:
 *               type: string
 *             contrasena:
 *               type: string
 *             rol:
 *               type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *       400:
 *         description: Todos los campos son obligatorios.
 */
router.post('/usuarios', verificarToken, usuarioController.registrarUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario existente
 *     description: Permite actualizar la información de un usuario existente.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar.
 *       - in: body
 *         name: body
 *         description: Datos actualizados del usuario.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             nombre_usuario:
 *               type: string
 *             contrasena:
 *               type: string
 *             rol:
 *               type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente.
 *       404:
 *         description: Usuario no encontrado.
 */
router.put('/usuarios/:id', verificarToken, usuarioController.actualizarUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     description: Permite eliminar un usuario existente.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar.
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente.
 *       404:
 *         description: Usuario no encontrado.
 */
router.delete('/usuarios/:id', verificarToken, usuarioController.eliminarUsuario);

module.exports = router;
