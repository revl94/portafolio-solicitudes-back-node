const express = require('express');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(`/opt/node/backend/src/bin/common.properties`);
const RequestController = require('../controllers/request_controller');
const request_router = express.Router();
const urirequest = properties.get('routes.api.request');
const uriId = properties.get('routes.api.request.id');
const uriName = properties.get('routes.api.request.name');
const uriValidTo = properties.get('routes.api.request.validTo');

/**
 * CRUD para solicitudes
 * */
request_router.route(urirequest)
    .get(RequestController.getAllRequest) //Obtener todas las solicitudes
    .post(RequestController.addRequest) //Agregar una solicitud nueva
    .put(RequestController.updateRequest); //Actualizar la solicitud (Fecha y solicitud)

    // Eliminar solicitud
request_router.route(uriValidTo)
.put(RequestController.updateValidToRequest);



/**
 * Filtro para Rutas de solicitudes
 * */
/*
//Muestra solicitudes por ID
request_router.route(uriId)
    .get(RequestController.getRequestByID);

//Muestra solicitudes por Nombre
request_router.route(uriName)
    .get(RequestController.getRequestByName);

//Muestra solicitudes por Fecha
request_router.route(uriValidTo)
    .get(RequestController.getRequestByDate);
*/

module.exports = request_router;
