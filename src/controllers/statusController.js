const models = require('../models');
const Sequelize = require('sequelize');
const HttpStatus = require('http-status-codes');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(`/opt/node/backend/src/bin/common.properties`);
const Op = Sequelize.Op;
let message;
let type;

module.exports = {
    // FUNCION OBTENER TODOS LOS STATUS CON FECHA VALIDA MAYOR AL DIA ACTUAL

    getAllStatus(req,res,next) {
    
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate());
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+' '+time;

        models.entityStatus.findAll({
                where: {
                    estValidTo: {[Op.gte]: dateTime}
                },
            order: [
                ['estName', 'ASC'],

            ],
            }

        )
        .then((estados) => {
            if(estados.length > 0) {
                type="success";
                res.status(HttpStatus.OK).json(estados);
            } else {
                message=properties.get('message.stats.res.notData');
                type="Not Data";
                res.status(HttpStatus.OK).json({message,estados,type});
            }
        },(err) => {
            console.dir(err);
            message = properties.get('message.res.errorInternalServer');
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
            next(err);
        });
    },

    // FUNCION PARA AGREGAR STATUS

    addStatus(req,res,next) {
        
        let body = req.body;
    models.entityStatus
        .create({
            estName: body.estName,
        })
        .then((estados) => {
            message = properties.get('message.stats.res.okCreated');
            type = "success";
            res.status(HttpStatus.OK).json(estados);
        }, (err) => {
            console.dir(err);
            message = properties.get('message.res.errorInternalServer');
            next(err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
        });
},
    // FUNCION PARA ACTUALIZAR STATUS

    updateStatus(req,res,next) {
        models.entityStatus.findOne({
            where: {
                estId: req.body.estId
            }
        })
            .then((estados) => {
                if (estados) {
                    estados.update({


                        estName: (req.body.estName != null) ? req.body.estName : estados.estName, //Actualizar Nombre

                    })
                        .then((estados) => {
                            message = properties.get('message.res.statusUpdated');
                            type = "success";
                            res.status(HttpStatus.OK).json(estados);
                        }, (err) => {
                            console.dir(err);
                            message = properties.get('message.res.errorInternalServer');
                            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                            next(err);
                        });
                }
            }, (err) => {
                message = properties.get('message.stats.res.notDataToUpdate');
                res.status(HttpStatus.NOT_FOUND).json({message});
                next(err);
            });
    },
    
    // FUNCION PARA ELIMINAR STATUS

    deleteStatus(req,res,next) {

        models.entityStatus.findOne({
            where: {
                estId: req.params.id
            }
        })
            .then((estados) => {

                if (estados) {
                    let today = new Date();
                    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() - 1);
                    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    let dateTime = date + ' ' + time;

                    estados.update({
                        estValidTo: dateTime //Actualizar Fecha de validación para eliminar
                    })
                        .then((estados) => {
                            message = properties.get('message.res.statusDeleted');
                            type = "success";
                            res.status(HttpStatus.OK).json({message, estados, type});
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

    getStatusById (req, res, next) {

    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;

    models.entityStatus.findAll({
      where: {
        estId: {
          [Op.like]: req.params.id
        },
        estValidTo: {
          [Op.gte]: dateTime
        }
      }
    })
      .then((estados) => {
        if (estados.length > 0) {
          type = "success";
          res.status(HttpStatus.OK).json(estados);
        } else {
          message = properties.get('message.coa.res.notData');
          type = "Not Data";
          res.status(HttpStatus.OK).json({ estados, type });
        }
      }, (err) => {
        console.dir(err);
        message = properties.get('message.res.errorInternalServer');
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message });
        next(err);
      });
  },
    
    getAllStatusFilter(req,res,next){

            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate());
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTime = date+' '+time;

            models.entityStatus.findAll({
                    where: {
                        estValidTo: {[Op.gte]: dateTime}
                    }
                }
            )
                .then((estados) => {
                    if(estados.length > 0) {
                        type="success";
                        res.status(HttpStatus.OK).json({estados});
                    } else {
                        message=properties.get('message.stats.res.notData');
                        type="Not Data";
                        res.status(HttpStatus.OK).json({message,estados,type});
                    }
                },(err) => {
                    console.dir(err);
                    message = properties.get('message.res.errorInternalServer');
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                    next(err);
                });
        }
            
    };




