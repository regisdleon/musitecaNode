// Instancia de Sequelize para conectarse a la base de datos
const sequelize = require("../helpers/database.js");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const createAdmin = require('../createAdmin.js'); // Importa la función createAdmin
const usuarioRoutes = require('../routes/usuarioRoutes.js');
const artistaRoutes = require('../routes/artistaRoutes.js');
const albumRoutes = require('../routes/albumRoutes.js'); // Importar rutas de álbum
const cancionRoutes = require('../routes/cancionRoutes.js'); // Importar rutas de canción
const opinionRoutes = require('../routes/opinionRoutes.js'); // Importar rutas de opinión

// app.js
const verificarToken = require('../middleware/verificarToken.js');
const verificarRol = require('../middleware/verificarRol.js');

// Middlewares

//delvis tg
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000', // Cambia esto al origen de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Aplica middlewares solo a rutas protegidas
app.use('/api/ruta-protegida', verificarToken, verificarRol('admin'), (req, res) => {
  // Lógica de la ruta protegida
});

// Usar las rutas de artistas
app.use('/api', artistaRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', albumRoutes);
app.use('/api', cancionRoutes);
app.use('/api', opinionRoutes);


app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Sincronizar los modelos para verificar la conexión con la base de datos
sequelize
  .sync({ alter: true })
  .then(async () => {
    console.log("Todos los modelos se sincronizaron correctamente.");

    // Crear el administrador después de sincronizar los modelos
    await createAdmin(); // Llama a la función createAdmin
  })
  .catch((err) => {
    console.log("Ha ocurrido un error al sincronizar los modelos: ", err);
  });

// Configure Swagger
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Musiteca',
      version: '1.0.0',
      description: 'REGIS MUSICA',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js', './models/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Iniciar el servidor
app.listen(4000, () => {
  console.log('Servidor iniciado en el puerto 4000');
});
