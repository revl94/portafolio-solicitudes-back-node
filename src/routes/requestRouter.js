const express = require('express');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(`/opt/node/backend/src/bin/common.properties`);
const modalController = require('../controllers/modalCreateController');
const requestRouter = express.Router();
const uriGet = properties.get('routes.api.portfolio');
const uriUpdate = properties.get('routes.api.updatemodal');
const uriFilter = properties.get('routes.api.portfolio.filter');
const uriFilterTitle = properties.get('routes.api.portfolio.filterTitle');
const uriFilterTitleNoPmo = properties.get('routes.api.portfolio.filterTitleNoPmo');
const uriFilterTitleNoClient = properties.get('routes.api.portfolio.filterTitleNoClient');
const uriFilterNoPmo = properties.get('routes.api.portfolio.filterNoPmo');
const uriFilterNoClient = properties.get('routes.api.portfolio.filterNoClient');
const uriBacklog = properties.get('routes.api.portfolio.backlog');
const backlogNoClient = properties.get('routes.api.portfolio.backlogNoClient');
const uriNoBacklog = properties.get('routes.api.portfolio.noBacklog');
const uriNoBacklogNoClient = properties.get('routes.api.portfolio.noBacklogNoClient');
const uriUpdateClient = properties.get('routes.api.portfolio.update');


// ---------------   Rutas de Modal   ---------------------
requestRouter.route(uriGet)
    .get(modalController.getAllRequests)
    .put(modalController.UpdateRequestDate);
requestRouter.route(uriGet)
    .post(modalController.CreateRequest);
requestRouter.route(uriUpdate)
    .put(modalController.UpdateRequest);
requestRouter.route(uriFilter)
    .get(modalController.getPorfolioById);
requestRouter.route(uriFilterTitle)
    .get(modalController.buscarTitulo);
requestRouter.route(uriFilterTitleNoPmo)
    .get(modalController.buscarTituloNoPmo);
requestRouter.route(uriFilterTitleNoClient)
    .get(modalController.buscarTituloNoClient);
requestRouter.route(uriFilterNoPmo)
    .get(modalController.getPorfolioByIdNoPmo);
requestRouter.route(uriFilterNoClient)
    .get(modalController.getPorfolioByIdNoClient);
requestRouter.route(uriBacklog)
    .get(modalController.backlog);
requestRouter.route(backlogNoClient)
    .get(modalController.backlogNoClient);
requestRouter.route(uriNoBacklog)
    .get(modalController.noBacklog);
requestRouter.route(uriNoBacklogNoClient)
    .get(modalController.noBacklogNoClient);
requestRouter.route(uriUpdateClient)
    .put(modalController.UpdateClientRequest);


module.exports = requestRouter;
