const express = require('express');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(process.env.PATH_PROPERTIES);
const clientesController = require('../controllers/clientesController');
const clientesRouter = express.Router();
const uriClientes = properties.get('routes.api.clientes');
const uriClientesId = properties.get('routes.api.clientes.id');


/**
 * CRU para clientes
 * */
clientesRouter.route(uriClientes)
    .get(clientesController.getAllClientes)
    .post(clientesController.addClientes)
    .put(clientesController.updateCliente);


clientesRouter.route(uriClientesId)
    .get(clientesController.getClienteById)
    .put(clientesController.deleteCliente);


module.exports = clientesRouter;