// ======================================
// Importación de Módulos y Dependencias
// ======================================
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const sequelize = require('./helpers/database'); // Configuración de Sequelize

// Middlewares Personalizados
const verificarToken = require('./middleware/verificarToken');
const verificarRol = require('./middleware/verificarRol');

// Rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const artistaRoutes = require('./routes/artistaRoutes');
const albumRoutes = require('./routes/albumRoutes');
const cancionRoutes = require('./routes/cancionRoutes');
const opinionRoutes = require('./routes/opinionRoutes');
const createAdmin = require('./createAdmin'); // Script de creación de admin

// ======================================
// Configuración Inicial de Express
// ======================================
const app = express();

// ======================================
// Middlewares Globales
// ======================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ======================================
// Configuración de Swagger
// ======================================
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Musiteca API',
      version: '1.0.0',
      description: 'Sistema de gestión musical'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./routes/*.js', './models/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ======================================
// Configuración de Rutas
// ======================================
// Ruta de prueba básica
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Musiteca');
});

// Rutas Protegidas
app.use('/api/protegido', verificarToken, verificarRol('admin'), (req, res) => {
  res.json({ mensaje: 'Acceso autorizado para administradores' });
});

// Rutas de la API
app.use('/api', usuarioRoutes);
app.use('/api', artistaRoutes);
app.use('/api', albumRoutes);
app.use('/api', cancionRoutes);
app.use('/api', opinionRoutes);

// ======================================
// Sincronización de Base de Datos
// ======================================
sequelize.sync({ force: false })
  .then(async () => {
    console.log('✓ Modelos sincronizados con la base de datos');
    await createAdmin();
  })
  .catch(error => {
    console.error('✗ Error en sincronización:', error);
  });

// ======================================
// Inicio del Servidor
// ======================================
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`🚀 Servidor activo en puerto ${PORT}`);
  console.log(`📚 Documentación: http://localhost:${PORT}/api-docs`);
  console.log(`=================================`);
});