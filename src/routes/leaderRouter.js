const express = require('express');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(process.env.PATH_PROPERTIES);
const leaderController = require('../controllers/leaderController');
const leaderRouter = express.Router();
const uriLeader = properties.get('routes.api.leader');
/**
 * CRU para STATUS
 * */
leaderRouter.route(uriLeader)
    .get(leaderController.getAllLeaders);
module.exports = leaderRouter;
