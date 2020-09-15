const express = require('express');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(process.env.PATH_PROPERTIES);
const statusController = require('../controllers/statusController');
const statusRouter = express.Router();
const uriStatus = properties.get('routes.api.status');
const uriStatusId = properties.get('routes.api.status.id');

/**
 * CRU para STATUS
 * */
statusRouter.route(uriStatus)
    .get(statusController.getAllStatus)
    .post(statusController.addStatus)
    .put(statusController.updateStatus);

statusRouter.route(uriStatusId)
    .get(statusController.getStatusById)
    .put(statusController.deleteStatus);


module.exports = statusRouter;