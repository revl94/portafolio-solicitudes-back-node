const models = require('../models');
const Sequelize = require('sequelize');
const HttpStatus = require('http-status-codes');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(`/opt/node/backend/src/bin/common.properties`);
const Op = Sequelize.Op;
const axios = require('axios');
//axios.defaults.baseURL = 'http://localhost:8080';
const qs = require('querystring');
const requestBody = {
    client_id: "admin-cli",
    username: "mlomeli",
    password: "123456",
    grant_type: "password"
}
const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}
let message;
let type;

module.exports = {

    // METODO PARA OBTENER TODOS LOS USUARIOS REGISTRADOS EN LA db

    getAllUser(req,res,next) {

        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+' '+time;

        models.user.findAll({
                where: {
                    userValidTo: {
                        [Op.gte]: dateTime
                    }           
                }
            }
            )
        .then((users) => {
            if(users.length > 0) {
                type="success";
                res.status(HttpStatus.OK).json(users);
            } else {
                message=properties.get('message.usr.res.notData');
                type="Not Data";
                res.status(HttpStatus.OK).json(users);
            }
        },(err) => {
            console.dir(err);
            message = properties.get('message.res.errorInternalServer');
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(message);
            next(err);
        });
    },

    
    async getToken(req,res,next){
        await axios.post('http://localhost:8080/auth/realms/Intelix/protocol/openid-connect/token', qs.stringify(requestBody), config)
        .then( (token) => {
            console.dir("hola")
            console.dir(token.data)
            res.json({token})
        }).catch( function(error){
            console.log(error)
        });

    },
    // METODO PARA AGREGAR UN USUARIOS
    addUser(req,res,next) {
        models.user.create({
            userName: req.body.userName,
            userFullName: req.body.userFullName,
            userContactEmail: req.body.userContactEmail
        })
        .then((users) => {
            message = properties.get('message.user.res.okCreated'); //
            type="success";
            res.status(HttpStatus.OK).json({message,users,type});
        }, (err) => {
            console.dir(err);
            message = properties.get('message.res.errorInternalServer');
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
            next(err);
        });
    },

    // METODO PARA ACTUALIZAR ALGUN(OS) DE LOS CAMPOS DE UN USUARIO

    updateUser(req,res,next) {

        models.user.findOne({
            where: {
                userId: req.body.userId
            }
        })
            .then((users) => {
                if (users) {
                    users.update({

                        userName: (req.body.userName != null) ? req.body.userName : users.userName,
                        userFullName: (req.body.userFullName != null) ? req.body.userFullName : users.userFullName,
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

// FUNCION PARA ELIMINAR USUARIOS


    deleteUser(req,res,next) {

        models.user.findOne({
            where: {
                userId: req.params.id    }
        })
        .then((users) => {

            if (users) {
                let today = new Date();
                let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                let dateTime = date+' '+time;

                users.update({
                    userValidTo: dateTime //Actualizar Fecha de validación para eliminar
                })
                    .then((users) => {
                        message = properties.get('message.res.deleted');
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
            message = properties.get('message.usr.res.notDataToDelete');
            res.status(HttpStatus.NOT_FOUND).json({message});
            next(err);
        });
    },

    // FUNCION PARA FILTRAR USUARIOS POR ID


   getUserByEmail(req,res,next) {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
        let time = today.getHours() + ':' + today.getMinutes() + '-' + today.getSeconds();
        let dateTime = date + ' ' + time;

        models.user.findAll({
            where: {
                userContactEmail: {
                    [Op.like]: req.params.email
                },
                userValidTo: {
                    [Op.gte]: dateTime
                }
            }
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
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                next(err);
            });
    },

};
