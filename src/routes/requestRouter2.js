const express = require('express');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(`/opt/node/backend/src/bin/common.properties`);
const requestController = require('../controllers/requestController.js');
const requestRouter2 = express.Router();
const uriGet = properties.get('routes.api.portfolio');
const uriUpdate = properties.get('routes.api.updatemodal');


requestRouter2.route(uriGet)
    .get(requestController.getAllRequests)
    .put(requestController.UpdateRequestDate);
requestRouter2.route(uriGet)
    .post(requestController.CreateRequest);
requestRouter2.route(uriUpdate)
    .put(requestController.UpdateRequest);







module.exports = requestRouter2;