const Usuario = require('./models/usuario'); // Ruta correcta
const bcrypt = require('bcrypt');

const createAdmin = async () => {
  try {
    const adminExistente = await Usuario.findOne({
      where: { nombre_usuario: 'admin' }
    });

    if (adminExistente) {
      console.log('El administrador ya existe');
      return;
    }

    await Usuario.create({
      nombre_usuario: 'admin',
      contrasena: await bcrypt.hash('admin123', 10),
      rol: 'administrador'
    });

    console.log('✅ Administrador creado exitosamente');
  } catch (error) {
    console.error('❌ Error al crear administrador:', error);
  }
};

module.exports = createAdmin;