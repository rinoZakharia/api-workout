const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Workout API Documentation',
            version: '6.6.6',
            description: 'API untuk mengelola latihan dan rutinitas workout',
        },
    },
    apis: ['./routes.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
    swaggerSpec,
    swaggerUi,
};