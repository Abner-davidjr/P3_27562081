var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
var app = express();

// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentación de la API utilizando Swagger',
        },
        /*servers: [
            {
                url: 'http://localhost:3000', // Cambia esto si tu servidor corre en otro puerto
            },
        ],*/
    },
    apis: ['./app.js'], // Ruta a los archivos donde están los comentarios JSDoc
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(logger('dev'));
app.use(express.json());
/**
 * @swagger
 * /ping:
 *   get: 
 *     summary: Responde con un mensaje de "pong"
 *     responses: 
 *       200:
 *         description: Respuesta exitosa con "pong"
 */
// Endpoint 2: /ping
app.get('/ping', (req, res) => {
    res.status(200).send('pong'); // Responde con código de estado 200
});


/**
 * @swagger
 * /about:
 *   get:
 *     summary: Mostrar información sobre la API
 *     responses:
 *       200:
 *         description: Información sobre la API
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                       example: Abner David Ortega Brea 
 *                     cedula:
 *                       type: number
 *                       example: 27562081
 *                     seccion:
 *                       type: number
 *                       example: 2
 */
// Endpoint 1: /about
app.get('/about', (req, res) => {
    const response = {
        status: 'success',
        data: {
            nombre: '',  // Puede agregar con tu nombre
            cedula: '',  // Puede agregar con tu cédula
            seccion: '',  // Puede agregar con tu sección
        }
    };
    res.status(200).json(response);
});

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
