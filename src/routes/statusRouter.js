const express = require('express');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(`/opt/node/backend/src/bin/common.properties`);
const statusController = require('../controllers/statusController');
const statusRouter = express.Router();
const uriStatus = properties.get('routes.api.status');
const uriStatusUpdate = properties.get('routes.api.status.update');
const uristatusFilter = properties.get('routes.api.status.filter');
/**
 * CRU para STATUS
 * */
statusRouter.route(uriStatus)
    .get(statusController.getAllStatus)
    .post(statusController.addStatus);

statusRouter.route(uriStatusUpdate)
    .put(statusController.updateStatus)
    .delete(statusController.deleteStatus);

statusRouter.route(uristatusFilter)
    .get(statusController.getAllStatusFilter);

module.exports = statusRouter;
