const express = require('express');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(`/opt/node/backend/src/bin/common.properties`);
const technicalAreaController = require('../controllers/technicalAreaController');
const technicalAreaRouter = express.Router();
const uriTechnicalArea = properties.get('routes.api.technical');
const uriTechnicalAreaId = properties.get('routes.api.technical.id');

/**
 * CRUD para area tecnica
 * */
technicalAreaRouter.route(uriTechnicalArea)
    .get(technicalAreaController.getAllTechnicalArea)
    .post(technicalAreaController.addTechnicalArea)
    .put(technicalAreaController.updateTechnicalArea);
/**
 * Filtro para area tecnica
 * */
technicalAreaRouter.route(uriTechnicalAreaId)
    .get(technicalAreaController.getTechnicalAreaById)
    .put(technicalAreaController.updateValidToTechnicalArea);


module.exports = technicalAreaRouter;