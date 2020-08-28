const express = require('express');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(`/opt/node/backend/src/bin/common.properties`);
const rTypeController = require('../controllers/requestTypeController');
const requestTypeRouter = express.Router();
const urirequest = properties.get('routes.api.request');
const uriId = properties.get('routes.api.request.id');

/**
 * CRUD para solicitudes
 * */
requestTypeRouter.route(urirequest)
    .get(rTypeController.getAllRequest) //Obtener todas las solicitudes
    .post(rTypeController.addRequest) //Agregar una solicitud nueva
    .put(rTypeController.updateRequest); //Actualizar la solicitud (Fecha y solicitud)

requestTypeRouter.route(uriId)
    .get(rTypeController.getRequestByID)
    .put(rTypeController.updateValidToRequest);

module.exports = requestTypeRouter;