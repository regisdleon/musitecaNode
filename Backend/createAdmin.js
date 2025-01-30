// createAdmin.js
const pool = require('./config/db');
const bcrypt = require('bcrypt');

const createAdmin = async () => {
  const nombre_usuario = 'admin'; // Nombre de usuario del administrador
  const contrasena = 'admin123'; // Contraseña del administrador
  const rol = 'admin'; // Rol del administrador

  try {
    // Verifica si el administrador ya existe
    const userExists = await pool.query('SELECT * FROM usuarios WHERE nombre_usuario = $1', [nombre_usuario]);
    if (userExists.rows.length > 0) {
      console.log('El administrador ya existe.');
      return;
    }

    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Inserta el administrador en la base de datos
    await pool.query(
      'INSERT INTO usuarios (nombre_usuario, contrasena, rol, "createdAt", "updatedAt") VALUES ($1, $2, $3, NOW(), NOW())',
      [nombre_usuario, hashedPassword, rol]
    );

    console.log('Administrador creado exitosamente.');
  } catch (error) {
    console.error('Error al crear el administrador:', error);
  }
};

// Exporta la función createAdmin
module.exports = createAdmin;