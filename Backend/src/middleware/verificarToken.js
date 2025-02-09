const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    // Obtener el token del encabezado de la solicitud
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Si no hay token, denegar el acceso
    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
        // Verificar el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Agregar los datos del usuario decodificados al objeto `req`
        req.usuario = decoded;

        // Continuar con la siguiente función (controlador)
        next();
    } catch (error) {
        // Si el token es inválido o ha expirado
        res.status(400).json({ mensaje: 'Token inválido o expirado.' });
    }
};

module.exports = verificarToken;