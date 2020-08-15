const express = require('express');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(`/opt/node/backend/src/bin/common.properties`);
const coaController = require('../controllers/comercialAreasController');
const comercialAreasRouter = express.Router(); // modulo de express para rutas
const uriCoa = properties.get('routes.api.coa');
const uriCoaValidTo = properties.get('routes.api.coa.validto');
const uriCoaId = properties.get('routes.api.coa.id');
const uriCoaName = properties.get('routes.api.coa.name');
const uriCoaIdName = properties.get('routes.api.coa.idname');

/**
 * CRU de las areas comerciales
 * */
comercialAreasRouter.route(uriCoa)
  .get(coaController.getAllCoa)
  .post(coaController.addCoa)
  .put(coaController.updateCoa);

comercialAreasRouter.route(uriCoaValidTo)
    .put(coaController.updateValidToComercialAreas);


/**
 * Filtro para area comercial
 * */
comercialAreasRouter.route(uriCoaId)
  .get(coaController.getCoaById);

comercialAreasRouter.route(uriCoaName)
  .get(coaController.getCoaByNombre);

comercialAreasRouter.route(uriCoaIdName)
  .get(coaController.getCoaByNombreyId);


module.exports = comercialAreasRouter;
