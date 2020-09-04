const models = require('../models');
const Sequelize = require('sequelize');
const HttpStatus = require('http-status-codes');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(`/opt/node/backend/src/bin/common.properties`);
const Op = Sequelize.Op;
let message;
let type;

module.exports = {

    // METODO PARA OBTENER TODOS LOS USUARIOS REGISTRADOS EN LA db
    getAllUC(req,res,next) {

        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+' '+time;

        models.userClient.findAll({
                where: {
                    ucValidTo: {
                        [Op.gte]: dateTime
                    }           
                },
                include: [
                    {
                        model: models.client,
                        as: 'client',
                        require: true
                    },
                    {
                       model: models.user,
                        as: 'user' 
                    }
                    ]
            }
            )
        .then((userClient) => {
            if(userClient.length > 0) {
                type="success";
                res.status(HttpStatus.OK).json({userClient, type});
            } else {
                message=properties.get('message.usr.res.notData');
                type="Not Data";
                res.status(HttpStatus.OK).json({message,userClient,type});
            }
        },(err) => {
            console.dir(err);
            message = properties.get('message.res.errorInternalServer');
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
            next(err);
        });
    },

    // METODO PARA AGREGAR UN USUARIOS

    addUC(req,res,next) {
        models.userClient.create({
            userId: req.body.userId,
            cliId: req.body.cliId
        })
        .then((userClient) => {
            message = properties.get('message.user.res.okCreated'); //
            type="success";
            res.status(HttpStatus.OK).json({message,userClient,type});
        }, (err) => {
            console.dir(err);
            message = properties.get('message.res.errorInternalServer');
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
            next(err);
        });
    },

    // METODO PARA ACTUALIZAR ALGUN(OS) DE LOS CAMPOS DE UN USUARIO

  /*  updateUser(req,res,next) {

        models.userClient.findOne({
            where: {
                ucId: req.body.userId
            }
        })
            .then((users) => {
                if (users) {
                    users.update({

                        userName: (req.body.userName != null) ? req.body.userName : users.userName,
                        userContactEmail: (req.body.userContactEmail != null) ? req.body.userContactEmail : users.userContactEmail
                        

                })
                        .then((users) => {
                            message = properties.get('message.res.userUpdated');
                            type = "success";
                            res.status(HttpStatus.OK).json({message, users, type});
                        }, (err) => {
                            console.dir(err);
                            message = properties.get('message.res.errorInternalServer');
                            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                            next(err);
                        });
                }
            }, (err) => {
                message = properties.get('message.user.res.notDataToUpdate'); //
                res.status(HttpStatus.NOT_FOUND).json({message});
                next(err);
            });
    },
*/
// FUNCION PARA ELIMINAR USUARIOS


    deleteUserClient(req,res,next) {

        models.userClient.destroy({
            where: {
                userId: req.params.userId,
                cliId: req.params.cliId    
            }
        })
        .then((users) => {
                        message = properties.get('message.res.deleted');
                        type = "success";
                        res.status(HttpStatus.OK).json({message, users, type});
        }, (err) => {
            message = properties.get('message.usr.res.notDataToDelete');
            res.status(HttpStatus.NOT_FOUND).json({message});
            next(err);
        });
    },
 
    // FUNCION PARA FILTRAR USUARIOS POR ID
    checkIfExist(req,res,next){
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
        let time = today.getHours() + ':' + today.getMinutes() + '-' + today.getSeconds();
        let dateTime = date + ' ' + time;

        models.userClient.findAll({
            where: {
                userId: {
                    [Op.like]: req.body.userId
                },
                cliId: {
                    [Op.like]: req.body.cliId
                },
                ucValidTo: {
                    [Op.gte]: dateTime
                }
            }
        })
            .then((request) => {
                if (request.length > 0) {
                    type = "success";
                    res.status(HttpStatus.OK).json({message, request, type});
                } else {
                    message = properties.get('message.usr.res.notData');
                    type = "Not Data";
                    res.status(HttpStatus.OK).json({request, type});
                }
            }, (err) => {
                console.dir(err);
                message = properties.get('message.res.errorInternalServer');
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                next(err);
            });
    },

    getClienteByUserId(req,res,next) {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
        let time = today.getHours() + ':' + today.getMinutes() + '-' + today.getSeconds();
        let dateTime = date + ' ' + time;

        models.userClient.findAll({
            where: {
                userId: {
                    [Op.like]: req.params.id
                },
                ucValidTo: {
                    [Op.gte]: dateTime
                }
            }
        })
            .then((request) => {
                if (request.length > 0) {
                    type = "success";
                    res.status(HttpStatus.OK).json({message, request, type});
                } else {
                    message = properties.get('message.usr.res.notData');
                    type = "Not Data";
                    res.status(HttpStatus.OK).json({request, type});
                }
            }, (err) => {
                console.dir(err);
                message = properties.get('message.res.errorInternalServer');
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                next(err);
            });
    },

    getClienteByUserId2(req,res,next) {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
        let time = today.getHours() + ':' + today.getMinutes() + '-' + today.getSeconds();
        let dateTime = date + ' ' + time;

        models.userClient.findAll({
            where: {
                userId: {
                    [Op.like]: req.params.id
                },
                ucValidTo: {
                    [Op.gte]: dateTime
                }
            },
            include: [
                    {
                        model: models.client,
                        as: 'client',
                        require: true
                    },
                    ],
                    order: [
                [models.client, 'cliName', 'ASC']

            ],
        })
            .then((request) => {
                if (request.length > 0) {
                    type = "success";
                    res.status(HttpStatus.OK).json(request);
                } else {
                    message = properties.get('message.usr.res.notData');
                    type = "Not Data";
                    res.status(HttpStatus.OK).json({request, type});
                }
            }, (err) => {
                console.dir(err);
                message = properties.get('message.res.errorInternalServer');
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(message);
                next(err);
            });
    },

};
