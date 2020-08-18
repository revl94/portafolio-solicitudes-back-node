const models = require('../models');
const Sequelize = require('sequelize');
const HttpStatus = require('http-status-codes');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(`/opt/node/backend/src/bin/common.properties`);
const Op = Sequelize.Op;
let message;
let type;

module.exports = {

    // METODO PARA OBTENER TODOS LOS CLIENTES REGISTRADOS EN LA db

    getAllClientes(req,res,next) {

        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+' '+time;


        let cliId = (req.query.cliId != null) ? req.query.cliId : "0";


        let cliIdArray = cliId.split(",");


        switch (cliId) {

            case '0':

                models.client.findAll({
                        where: {
                            cliValidTo: {
                                [Op.gte]: dateTime
                            }
                        },
                    order: [
                        ['cliName', 'ASC'],

                    ],
                    }
                )
                    .then((clientes) => {
                        if (clientes.length > 0) {
                            type = "success";
                            res.status(HttpStatus.OK).json(clientes);
                        } else {
                            message = properties.get('message.cli.res.notData');
                            type = "Not Data";
                            res.status(HttpStatus.OK).json({message, clientes, type});
                        }
                    }, (err) => {
                        console.dir(err);
                        message = properties.get('message.res.errorInternalServer');
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                        next(err);
                    });
                break;
            default:

                models.client.findAll({
                        where: {
                            cliValidTo: {
                                [Op.gte]: dateTime
                            },
                            cliId: {
                                [Op.in]: cliIdArray
                            },
                        },
                    order: [
                        ['cliName', 'ASC'],

                    ],
                    }
                )
                    .then((clientes) => {
                        if (clientes.length > 0) {
                            type = "success";
                            res.status(HttpStatus.OK).json(clientes);
                        } else {
                            message = properties.get('message.cli.res.notData');
                            type = "Not Data";
                            res.status(HttpStatus.OK).json({message, clientes, type});
                        }
                    }, (err) => {
                        console.dir(err);
                        message = properties.get('message.res.errorInternalServer');
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                        next(err);
                    });
                break;
        }
    },

    // METODO PARA AGREGAR UN CLIENTE

    addClientes(req,res,next) {
        models.client.create({
            cliName: req.body.cliName,
            cliContactName: req.body.cliContactName,
            cliContactEmail: req.body.cliContactEmail,
            cliHolisticManagerName: req.body.cliHolisticManagerName,
            cliHolisticManagerEmail: req.body.cliHolisticManagerEmail

        })
        .then((clientes) => {
            message = properties.get('message.client.res.okCreated');
            type="success";
            res.status(HttpStatus.OK).json(clientes);
        }, (err) => {
            console.dir(err);
            message = properties.get('message.res.errorInternalServer');
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
            next(err);
        });
    },

    // METODO PARA ACTUALIZAR ALGUN(OS) DE LOS CAMPOS DE UN CLIENTE

    updateCliente(req,res,next) {

        models.client.findOne({
            where: {
                cliId: req.body.cliId
            }
        })
            .then((clientes) => {
                if (clientes) {
                    clientes.update({

                        cliName: (req.body.cliName != null) ? req.body.cliName : clientes.cliName,
                        cliContactName: (req.body.cliContactName != null) ? req.body.cliContactName : clientes.cliContactName,
                        cliContactEmail: (req.body.cliContactEmail != null) ? req.body.cliContactEmail : clientes.cliContactEmail,
                        cliHolisticManagerName: (req.body.cliHolisticManagerName != null) ? req.body.cliHolisticManagerName : clientes.cliHolisticManagerName,
                        cliHolisticManagerEmail: (req.body.cliHolisticManagerEmail != null) ? req.body.cliHolisticManagerEmail :clientes.cliHolisticManagerEmail


                })
                        .then((clientes) => {
                            message = properties.get('message.res.cliUpdated');
                            type = "success";
                            res.status(HttpStatus.OK).json(clientes);
                        }, (err) => {
                            console.dir(err);
                            message = properties.get('message.res.errorInternalServer');
                            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                            next(err);
                        });
                }
            }, (err) => {
                message = properties.get('message.client.res.notDataToUpdate');
                res.status(HttpStatus.NOT_FOUND).json({message});
                next(err);
            });
    },

// FUNCION PARA ELIMINAR CLIENTE


    deleteCliente(req,res,next) {

        models.client.findOne({
            where: {
                cliId: req.params.id    }
        })
        .then((clientes) => {

            if (clientes) {
                let today = new Date();
                let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                let dateTime = date+' '+time;

                clientes.update({
                    cliValidTo: dateTime //Actualizar Fecha de validación para eliminar
                })
                    .then((clientes) => {
                        message = properties.get('message.res.deleted');
                        type = "success";
                        res.status(HttpStatus.OK).json({message, clientes, type});
                    }, (err) => {
                        console.dir(err);
                        message = properties.get('message.res.errorInternalServer');
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                        next(err);
                    });
            }
        }, (err) => {
            message = properties.get('message.cli.res.notDataToDelete');
            res.status(HttpStatus.NOT_FOUND).json({message});
            next(err);
        });
    },


    getClienteById(req,res,next) {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
        let time = today.getHours() + ':' + today.getMinutes() + '-' + today.getSeconds();
        let dateTime = date + ' ' + time;

        models.client.findAll({
            where: {
                cliId: {
                    [Op.like]: req.params.id
                },
                cliValidTo: {
                    [Op.gte]: dateTime
                }
            }
        })
            .then((clientes) => {
                if (clientes.length > 0) {
                    type = "success";
                    res.status(HttpStatus.OK).json(clientes);
                } else {
                    message = properties.get('message.cli.res.notData');
                    type = "Not Data";
                    res.status(HttpStatus.OK).json(clientes);
                }
            }, (err) => {
                console.dir(err);
                message = properties.get('message.res.errorInternalServer');
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                next(err);
            });
    },

};
