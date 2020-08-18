const express = require('express');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(`/opt/node/backend/src/bin/common.properties`);
const statusController = require('../controllers/statusController');
const statusRouter = express.Router();
const uriStatus = properties.get('routes.api.status');
const uriStatusId = properties.get('routes.api.status.id');
const uriStatusUpdate = properties.get('routes.api.status.update');
const uristatusFilter = properties.get('routes.api.status.filter');
/**
 * CRU para STATUS
 * */
statusRouter.route(uriStatus)
    .get(statusController.getAllStatus)
    .post(statusController.addStatus)
    .put(statusController.updateStatus);

statusRouter.route(uriStatusUpdate)
    
    .delete(statusController.deleteStatus);

statusRouter.route(uriStatusId)
    .get(statusController.getStatusById);

statusRouter.route(uristatusFilter)
    .get(statusController.getAllStatusFilter);

module.exports = statusRouter;
