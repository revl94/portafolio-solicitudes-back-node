const express = require('express');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(`/opt/node/backend/src/bin/common.properties`);
const clientesController = require('../controllers/clientesController');
const clientesRouter = express.Router();
const uriClientes = properties.get('routes.api.clientes');
const uriClientesUpdate = properties.get('routes.api.clientes.id');
const uriClientesId = properties.get('routes.api.clientes.id');


/**
 * CRU para clientes
 * */
clientesRouter.route(uriClientes)
    .get(clientesController.getAllClientes)
    .post(clientesController.addClientes)
    .put(clientesController.updateCliente);

clientesRouter.route(uriClientesUpdate)
    .delete(clientesController.deleteCliente);

clientesRouter.route(uriClientesId)
    .get(clientesController.getClienteById);


module.exports = clientesRouter;
