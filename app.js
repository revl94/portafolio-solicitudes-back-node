'use strict';
//require('fs');
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const winston = require('winston');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(`/opt/node/backend/src/bin/common.properties`);

//Import controllers which hold the CRUD methods for each model
const requestRouter = require('./src/routes/requestTypeRouter');
// Áreas Comerciales
const comercialAreasRouter = require('./src/routes/comercialAreasRouter');
// Áreas Técnicas
const technicalAreaRouter = require('./src/routes/technicalAreaRouter');
// Clientes
const clientesRouter = require('./src/routes/clientesRoutes');
//Status 
const statusRouter = require('./src/routes/statusRouter');
// Leader
const leaderRouter = require('./src/routes/leaderRouter');
// Ruta portfolio
const portfolioRouter = require('./src/routes/requestRouter');
//Ruta de usuarios
const userRouter = require('./src/routes/userRouter');
//Ruta de usuariosClientes
const userClientRouter = require('./src/routes/userClientRouter');
const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:8080';
const qs = require('querystring');
const requestBody = {
    client_id: "admin-cli",
    username: "mlomeli",
    password: "123456",
    grant_type: "password"
}
const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

//Instantiate Express
const app = express();
const root = properties.get('routes.api.index');
const version = properties.get('routes.api.version');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'development') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}
app.use(cors());
//Set up body-parser with JSON
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Se definen todos los enrutadores que utilizara el API
 * */

// Rutas de los Tipos de Solicitudes
app.use(version, requestRouter);
// Rutas de Áreas Comerciales
app.use(version, comercialAreasRouter);
// Rutas de las Áreas Técnicas
app.use(version, technicalAreaRouter);
// Rutas de los clientes
app.use(version, clientesRouter);
// Rutas de Status
app.use(version, statusRouter);
// Rutas para Lideres
app.use(version, leaderRouter);
// Rutas Portfolio
app.use(version, portfolioRouter);
// Rutas Usuario
app.use(version, userRouter);
// Rutas UsuarioCliente
app.use(version, userClientRouter);

//app.use('/token');


//===========================================
// End of Route Handlers
//===========================================

// Catch 404 errors and forward to error handler. This is called if no match is found in the preceding route functions.
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//Tell node to listen for the App on port 3000:
// listen on port 3000
app.listen(process.env.PORT || 3050, function() {
    console.log('Express app listening on port 3050');
});