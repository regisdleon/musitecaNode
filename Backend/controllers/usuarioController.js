const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

// Función para registrar un usuario
const registrarUsuario = async (req, res) => {
    try {
        const { nombre_usuario, contrasena, rol } = req.body;

        // Validar la entrada del usuario
        if (!nombre_usuario || !contrasena || !rol) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
        }

        // Verificar si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ where: { nombre_usuario } });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El nombre de usuario ya está en uso' });
        }

        // Hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        const contrasenaHasheada = await bcrypt.hash(contrasena, salt);

        // Crear el usuario en la base de datos
        const nuevoUsuario = await Usuario.create({
            nombre_usuario,
            contrasena: contrasenaHasheada,
            rol
        });

        // Generar un token JWT
        const token = jwt.sign(
            { id: nuevoUsuario.id, nombre_usuario: nuevoUsuario.nombre_usuario, rol: nuevoUsuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Responder con el token y los datos del usuario
        res.status(201).json({
            mensaje: 'Usuario registrado exitosamente',
            usuario: {
                id: nuevoUsuario.id,
                nombre_usuario: nuevoUsuario.nombre_usuario,
                rol: nuevoUsuario.rol
            },
            token
        });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Función para iniciar sesión
const iniciarSesion = async (nombre_usuario, contrasena) => {
    try {
        console.log('Full request', nombre_usuario);

        // Buscar al usuario en la base de datos
        const usuario = await Usuario.findOne({ where: { nombre_usuario } });
        if (!usuario) {
            throw new Error('Nombre de usuario o contraseña incorrectos');
        }

        // Comparar la contraseña hasheada con la contraseña proporcionada
        const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!contrasenaValida) {
            throw new Error('Nombre de usuario o contraseña incorrectos');
        }

        // Generar un token JWT
        const token = jwt.sign(
            { id: usuario.id, nombre_usuario: usuario.nombre_usuario, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Generar un refresh token
        const refreshToken = jwt.sign(
            { id: usuario.id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' }
        );

        // Devolver los datos del usuario y los tokens
        return {
            usuario: {
                id: usuario.id,
                nombre_usuario: usuario.nombre_usuario,
                rol: usuario.rol
            },
            token,
            refreshToken
        };
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw new Error(error.message || 'Error interno del servidor');
    }
};

// Función para refrescar el token
const refrescarToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        // Verificar si el refresh token está presente
        if (!refreshToken) {
            return res.status(400).json({ mensaje: 'Refresh token no proporcionado.' });
        }

        // Verificar el refresh token
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        // Buscar al usuario en la base de datos
        const usuario = await Usuario.findByPk(decoded.id);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }

        // Generar un nuevo token JWT
        const nuevoToken = jwt.sign(
            { id: usuario.id, nombre_usuario: usuario.nombre_usuario, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Responder con el nuevo token
        res.status(200).json({
            mensaje: 'Token refrescado exitosamente',
            token: nuevoToken
        });
    } catch (error) {
        console.error('Error al refrescar el token:', error);
        res.status(400).json({ mensaje: 'Refresh token inválido o expirado.' });
    }
};

// Función para obtener el perfil del usuario
const obtenerPerfil = async (req, res) => {
    try {
        // Obtener el ID del usuario desde el token (agregado por el middleware)
        const usuarioId = req.usuario.id;

        // Buscar al usuario en la base de datos
        const usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        // Responder con los datos del usuario
        res.status(200).json({
            mensaje: 'Perfil obtenido exitosamente',
            usuario: {
                id: usuario.id,
                nombre_usuario: usuario.nombre_usuario,
                rol: usuario.rol
            }
        });
    } catch (error) {
        console.error('Error al obtener el perfil:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Función para obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();

        res.status(200).json({
            mensaje: 'Usuarios obtenidos exitosamente',
            usuarios: usuarios.map(usuario => ({
                id: usuario.id,
                nombre_usuario: usuario.nombre_usuario,
                rol: usuario.rol
            }))
        });
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Función para actualizar un usuario
const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_usuario, contrasena, rol } = req.body;

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        // Actualizar los campos del usuario
        usuario.nombre_usuario = nombre_usuario || usuario.nombre_usuario;
        usuario.rol = rol || usuario.rol;

        // Si se proporciona una nueva contraseña, hashearla
        if (contrasena) {
            const salt = await bcrypt.genSalt(10);
            usuario.contrasena = await bcrypt.hash(contrasena, salt);
        }

        await usuario.save();

        res.status(200).json(usuario);
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Función para eliminar un usuario
const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        await usuario.destroy();

        res.status(200).json({ mensaje: 'Usuario eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Exportar las funciones
module.exports = { registrarUsuario, iniciarSesion, refrescarToken, obtenerPerfil, obtenerUsuarios, eliminarUsuario, actualizarUsuario };