const express = require('express');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(`/opt/node/backend/src/bin/common.properties`);
const coaController = require('../controllers/comercialAreasController');
const comercialAreasRouter = express.Router(); // modulo de express para rutas
const uriCoa = properties.get('routes.api.coa');
const uriCoaId = properties.get('routes.api.coa.id');


/**
 * CRU de las areas comerciales
 * */
comercialAreasRouter.route(uriCoa)
    .get(coaController.getAllCoa)
    .post(coaController.addCoa)
    .put(coaController.updateCoa);

/**
 * Filtro para area comercial
 * */
comercialAreasRouter.route(uriCoaId)
    .get(coaController.getCoaById)
    .put(coaController.updateValidToComercialAreas);

module.exports = comercialAreasRouter;