const express = require('express');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(`/opt/node/backend/src/bin/common.properties`);
const userController = require('../controllers/usersController');
const userRouter = express.Router();
const uriUser = properties.get('routes.api.user');
const uriUserUpdate = properties.get('routes.api.user.id');
const uriUserEmail = properties.get('routes.api.user.email');
const uriUserToken = properties.get('routes.api.user.token');

/**
 * CRU para user
 * */
userRouter.route(uriUser)
    .get(userController.getAllUser)
    .post(userController.addUser)
    .put(userController.updateUser);

userRouter.route(uriUserUpdate)

    .delete(userController.deleteUser);

userRouter.route(uriUserEmail)
  .get(userController.getUserByEmail); 

userRouter.route(uriUserToken)
  .get(userController.getToken); 

module.exports = userRouter; 