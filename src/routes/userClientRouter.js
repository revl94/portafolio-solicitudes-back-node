const express = require('express');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(`/opt/node/backend/src/bin/common.properties`);
const userClientController = require('../controllers/userClientController');
const userClientRouter = express.Router();
const uriuserClient = properties.get('routes.api.uc');
const uriuserClientId = properties.get('routes.api.uc.id');
const uriuserClientCheck = properties.get('routes.api.uc.check');
const uriuserClientUpdate = properties.get('routes.api.uc.update');

/**
 * CRU para userClient
 * */
userClientRouter.route(uriuserClient)
    .get(userClientController.getAllUC)
    .post(userClientController.addUC)
   // .put(userClientController.updateCliente);

/userClientRouter.route(uriuserClientUpdate)
    .delete(userClientController.deleteUserClient);

userClientRouter.route(uriuserClientId)
    .get(userClientController.getClienteByUserId2);

userClientRouter.route(uriuserClientCheck)
    .post(userClientController.checkIfExist);

module.exports = userClientRouter;
