const models = require('../models');
const Sequelize = require('sequelize');
const HttpStatus = require('http-status-codes');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(process.env.PATH_PROPERTIES);
let message;
let type;
const Op = Sequelize.Op;
let DATE = Sequelize.DATE;

module.exports = {
    //Fitrar todas las solicitudes en el sistema organizadas por fechas
    getAllRequest(req, res, next) {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ':' + today.getMinutes() + '-' + today.getSeconds();
        let dateTime = date + ' ' + time;
        models.requestType.findAll({
                where: {
                    typValidTo: {
                        [Op.gt]: dateTime
                    }
                },
                order: [
                    ['typName', 'ASC'],

                ],

            })
            .then((request) => {
                if (request.length > 0) {
                    type = "success";
                    res.status(HttpStatus.OK).json(request);
                } else {
                    message = properties.get('message.cli.res.notData');
                    type = "Not Data";
                    res.status(HttpStatus.OK).json(request);
                }
            }, (err) => {
                console.dir(err);
                message = properties.get('message.res.errorInternalServer');
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(message);
                next(err);
            });
    },
    //Filtrar Solicitud por ID
    getRequestByID(req, res, next) {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ':' + today.getMinutes() + '-' + today.getSeconds();
        let dateTime = date + ' ' + time;

        models.requestType.findAll({
                where: {
                    typId: {
                        [Op.like]: req.params.id
                    },
                    typValidTo: {
                        [Op.gte]: dateTime
                    }
                }
            })
            .then((request) => {
                if (request.length > 0) {
                    type = "success";
                    res.status(HttpStatus.OK).json(request);
                } else {
                    message = properties.get('message.cli.res.notData');
                    type = "Not Data";
                    res.status(HttpStatus.OK).json(request);
                }
            }, (err) => {
                console.dir(err);
                message = properties.get('message.res.errorInternalServer');
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(message);
                next(err);
            });
    },

    //Agregar Solicitudes nuevas
    addRequest(req, res, next) {
        models.requestType.create({
                typName: req.body.typName
            })
            .then((request) => {
                message = properties.get('message.cli.res.okCreated');
                type = "success";
                res.status(HttpStatus.OK).json(request);
            }, (err) => {
                console.dir(err);
                message = properties.get('message.res.errorInternalServer');
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(message);
                next(err);
            });
    },

    //Actualización de Solicitudes
    updateRequest(req, res, next) {
        models.requestType.findOne({
                where: {
                    typId: req.body.typId
                }
            })
            .then((request) => {
                if (request) {
                    request.update({
                            typName: (req.body.typName != null) ? req.body.typName : request.typName //Actualizar Nombre
                        })
                        .then((request) => {
                            message = properties.get('message.cli.res.cliUpdated');
                            type = "success";
                            res.status(HttpStatus.OK).json(request);
                        }, (err) => {
                            console.dir(err);
                            message = properties.get('message.res.errorInternalServer');
                            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(message);
                            next(err);
                        });
                }
            }, (err) => {
                message = properties.get('message.cli.res.notDataToUpdate');
                res.status(HttpStatus.NOT_FOUND).json(message);
                next(err);
            });
    },
    //Eliminación de solicitudes, no se elimina per se, sólo se oculta al usuario
    updateValidToRequest(req, res, next) {
        models.requestType.findOne({
                where: {
                    typId: req.params.id
                }
            })
            .then((request) => {
                if (request) {
                    let today = new Date();
                    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    let dateTime = date + ' ' + time;
                    request.update({
                            typValidTo: dateTime //Actualizar Fecha de validación para eliminar
                        })
                        .then((request) => {
                            message = properties.get('message.cli.res.deleted');
                            type = "success";
                            res.status(HttpStatus.OK).json(request);
                        }, (err) => {
                            console.dir(err);
                            message = properties.get('message.res.errorInternalServer');
                            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(message);
                            next(err);
                        });
                }
            }, (err) => {
                message = properties.get('message.res.noDataToDelete');
                res.status(HttpStatus.NOT_FOUND).json({ message });
                next(err);
            });
    }
};