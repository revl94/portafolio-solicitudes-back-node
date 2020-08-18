const models = require('../models');
const Sequelize = require('sequelize');
const HttpStatus = require('http-status-codes');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(`/opt/node/backend/src/bin/common.properties`);

let message;
let type;
const Op = Sequelize.Op;

module.exports = {
    //READ
    getAllTechnicalArea (req, res, next) {

        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+ ' '+time;

        models.technicalArea.findAll({
            where: {
                teaValidTo: {
                    [Op.gt]: dateTime
                }
            },
            order: [
                ['teaName', 'ASC'],

            ],
        })
          .then((technical) => {
              if (technical.length > 0) {
                  type = "success";
                  res.status(HttpStatus.OK).json(technical);
              } else {
                  message = properties.get('message.tech.res.notData');
                  type = "Not Data";
                  res.status(HttpStatus.OK).json(technical);
              }
          }, (err) => {
              console.dir(err);
              message = properties.get('message.res.errorInternalServer');
              res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message });
              next(err);
          });
    },
    
    getTechnicalAreaById(req,res,next) {
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+ ' '+time;
         models.technicalArea.findAll({
             where: {
                teaId: {
                    [Op.like]: req.params.id 
                },
                teaValidTo: {
                    [Op.gte]: dateTime
                }
            }
         })
           .then((technical) => {
               if (technical.length > 0) {
                  type = "success";
                  res.status(HttpStatus.OK).json(technical);
               } else {
                   message = properties.get('message.tech.res.notData');
                   type = "Not Data";
                   res.status(HttpStatus.OK).json(technical);
               }
           }, (err) => {
               console.dir(err);
               message = properties.get('message.res.errorInternalServer');
               res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message });
               next(err);
           });
    },
    /*
    getTechnicalAreaByName (req, res, next) {
        models.technicalAreaModel.findAll({
            where: {
                name: {
                    [Op.like]: '%' + req.params.name + '%'
                }
            }
        })
          .then((technical) => {
              if (technical.length > 0) {
                  type = "success";
                  res.status(HttpStatus.OK).json({ message, technical, type });
              } else {
                  message = properties.get('message.tech.res.notData');
                  type = "Not Data";
                  res.status(HttpStatus.OK).json({ technical, type });
              }
          }, (err) => {
              console.dir(err);
              message = properties.get('message.res.errorInternalServer');
              res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message });
              next(err);
          });
    },
     */
    //CREATE
    addTechnicalArea (req, res, next) {
        models.technicalArea.create({
            teaName: req.body.teaName,
        })
          .then((technical) => {
              message = properties.get('message.tech.res.okCreated');
              type = "success";
              res.status(HttpStatus.OK).json(technical);
          }, (err) => {
              console.dir(err);
              message = properties.get('message.res.errorInternalServer');
              res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message });
              next(err);
          });
    },
    //UPDATE
    updateTechnicalArea (req, res, next) {
        models.technicalArea.findOne({
            where: {
                teaId: req.body.teaId
            }
        })
          .then((technical) => {
              if (technical) {
                  technical.update({
                      teaName: (req.body.teaName != null) ? req.body.teaName: technical.teaName,
                  })
                    .then((technical) => {
                        message = properties.get('message.tech.res.techUpdated');
                        type = "success";
                        res.status(HttpStatus.OK).json({ message, technical, type });
                    }, (err) => {
                        console.dir(err);
                        message = properties.get('message.res.errorInternalServer');
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message });
                        next(err);
                    });
              }
          }, (err) => {
              message = properties.get('message.tech.res.notDataToUpdate');
              res.status(HttpStatus.NOT_FOUND).json({ message });
              next(err);
          });
    },
    //DELETE
    updateValidToTechnicalArea (req, res, next) {
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+ ' '+time;

        models.technicalArea.findOne({
            where: {
                teaId: req.body.teaId
            },
            teaValidTo: {
                [Op.gte]: dateTime
            }
        })
        .then((technical) => {
            if (technical) {

                technical.update({
                    teaValidTo: dateTime //Actualizar Fecha de validación para eliminar
                })
                    .then((technical) => {
                        message = properties.get('message.tech.res.deleted');
                        type = "success";
                        res.status(HttpStatus.OK).json({message, technical, type});
                    }, (err) => {
                        console.dir(err);
                        message = properties.get('message.res.errorInternalServer');
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                        next(err);
                    });
            }
        }, (err) => {
            message = properties.get('message.tech.res.notDataToDelete');
            res.status(HttpStatus.NOT_FOUND).json({message});
            next(err);
        });

    },

};

