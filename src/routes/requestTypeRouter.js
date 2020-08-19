const express = require('express');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(`/opt/node/backend/src/bin/common.properties`);
const rTypeRouterController = require('../controllers/requestTypeRouterController');
const requestTypeRouter = express.Router();
const urirequest = properties.get('routes.api.request');
const uriId = properties.get('routes.api.request.id');

/**
 * CRUD para solicitudes
 * */
requestTypeRouter.route(urirequest)
    .get(rTypeRouterController.getAllRequest) //Obtener todas las solicitudes
    .post(rTypeRouterController.addRequest) //Agregar una solicitud nueva
    .put(rTypeRouterController.updateRequest); //Actualizar la solicitud (Fecha y solicitud)

requestTypeRouter.route(uriId)
    .get(rTypeRouterController.getRequestByID)
    .put(rTypeRouterController.updateValidToRequest);

module.exports = requestTypeRouter;