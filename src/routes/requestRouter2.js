const express = require('express');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(process.env.PATH_PROPERTIES);
const requestController = require('../controllers/requestController.js');
const requestRouter2 = express.Router();
const uriGet = properties.get('routes.api.portfolio');
const uriUpdate = properties.get('routes.api.updatemodal');
const uriId = properties.get('routes.api.portfolio.id');


requestRouter2.route(uriGet)
    .get(requestController.getAllRequests);
    
requestRouter2.route(uriGet)
    .post(requestController.CreateRequest)
    .put(requestController.UpdateRequest);
    
requestRouter2.route(uriId)
    //.put(requestController.UpdateRequest)
    .get(requestController.getRequestByID)
    .put(requestController.UpdateRequestDate);







module.exports = requestRouter2;