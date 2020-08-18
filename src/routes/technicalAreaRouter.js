const express = require('express');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(`/opt/node/backend/src/bin/common.properties`);
const technicalAreaController = require('../controllers/technicalAreaController');
const technicalAreaRouter = express.Router();
const uriTechnicalArea = properties.get('routes.api.technical');
const uriValidTo = properties.get('routes.api.technical.validTo');
const uriTechnicalAreaId = properties.get('routes.api.technical.id');
// const uriTechnicalAreaName = properties.get('routes.api.technical.name');

/**
 * CRUD para area tecnica
 * */
technicalAreaRouter.route(uriTechnicalArea)
    .get(technicalAreaController.getAllTechnicalArea)
    .post(technicalAreaController.addTechnicalArea)
    .put(technicalAreaController.updateTechnicalArea);

technicalAreaRouter.route(uriValidTo)
    .put(technicalAreaController.updateValidToTechnicalArea);
/**
 * Filtro para area tecnica
 * */
 technicalAreaRouter.route(uriTechnicalAreaId)
     .get(technicalAreaController.getTechnicalAreaById);
// technicalAreaRouter.route(uriTechnicalAreaName)
//     .get(technicalAreaController.getTechnicalAreaByName);


module.exports = technicalAreaRouter;
