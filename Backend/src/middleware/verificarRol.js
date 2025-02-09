const verificarRol = (rolesPermitidos) => {
    return (req, res, next) => {
        // Obtener el rol del usuario desde `req.usuario` (agregado por verificarToken)
        const rolUsuario = req.usuario?.rol;

        // Verificar si el rol del usuario está en la lista de roles permitidos
        if (!rolesPermitidos.includes(rolUsuario)) {
            return res.status(403).json({ mensaje: 'Acceso denegado. No tienes permisos suficientes.' });
        }

        // Si el rol es válido, continuar con la siguiente función (controlador)
        next();
    };
};

module.exports = verificarRol;