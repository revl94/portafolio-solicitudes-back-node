
const models = require('../models');
const Sequelize = require('sequelize');
const HttpStatus = require('http-status-codes');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(`/opt/node/backend/src/bin/common.properties`);

let message;
let type;
const Op = Sequelize.Op;
const DATE = Sequelize.DATE;

module.exports = {
  getAllCoa (req, res, next) {

    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;

    models.comercialAreas.findAll( {
      where: {
        coaValidTo: {
          [Op.gt]: dateTime
        }
      },
      order: [
        ['coaName', 'ASC'],

      ],
    })
      .then((comercialareas) => {
        if (comercialareas.length > 0) {
          type = "success";
          res.status(HttpStatus.OK).json(comercialareas);
        } else {
          message = properties.get('message.coa.res.notData');
          type = "Not Data";
          res.status(HttpStatus.OK).json({ comercialareas, type });
        }
      }, (err) => {
        console.dir(err);
        message = properties.get('message.res.errorInternalServer');
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message });
        next(err);
      });
  },

  getCoaById (req, res, next) {

    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;

    models.comercialAreas.findAll({
      where: {
        id: {
          [Op.like]: '%' + req.params.id + '%'
        },
        validTo: {
          [Op.gte]: dateTime
        }
      }
    })
      .then((comercialareas) => {
        if (comercialareas.length > 0) {
          type = "success";
          res.status(HttpStatus.OK).json({ message, comercialareas, type });
        } else {
          message = properties.get('message.coa.res.notData');
          type = "Not Data";
          res.status(HttpStatus.OK).json({ comercialareas, type });
        }
      }, (err) => {
        console.dir(err);
        message = properties.get('message.res.errorInternalServer');
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message });
        next(err);
      });
  },

  getCoaByNombre (req, res, next) {

    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;

    models.comercialAreas.findAll({
      where: {
        name: {
          [Op.like]: '%' + req.params.name + '%'
        },
        validTo: {
          [Op.gte]: dateTime
        }
      }
    })
      .then((comercialareas) => {
        if (comercialareas.length > 0) {
          type = "success";
          res.status(HttpStatus.OK).json({ message, comercialareas, type });
        } else {
          message = properties.get('message.coa.res.notData');
          type = "Not Data";
          res.status(HttpStatus.OK).json({ comercialareas, type });
        }
      }, (err) => {
        console.dir(err);
        message = properties.get('message.res.errorInternalServer');
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message });
        next(err);
      });
  },

  getCoaByNombreyId(req,res,next) {

    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;

    models.comercialAreas.findAll({
      where:{
        name: {
          [Op.like]: '%'+req.params.name+'%'
        },
        id: {
          [Op.like]: '%'+req.params.id+'%'
        },
        validTo: {
          [Op.gte]: dateTime
        }
      }
    })
      .then((comercialareas) => {
        if(comercialareas.length > 0) {
          type="success";
          res.status(HttpStatus.OK).json({message,comercialareas,type});
        } else {
          message=properties.get('message.coa.res.notData');
          type="Not Data";
          res.status(HttpStatus.OK).json({comercialareas,type});
        }
      }, (err) => {
        console.dir(err);
        message = properties.get('message.res.errorInternalServer');
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
        next(err);
      });
  },

  addCoa(req,res,next) {
    models.comercialAreas.create({
      // id no es necesario porque es autoincremental
      coaName: req.body.coaName
    })
      .then((comercialareas) => {
        message = properties.get('message.coa.res.okCreated');
        type="success";
        res.status(HttpStatus.OK).json({message,comercialareas,type});
      }, (err) => {
        console.dir(err);
        message = properties.get('message.res.errorInternalServer');
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
        next(err);
      });
  },

  updateCoa(req,res,next) {
    models.comercialAreas.findOne({
      where: {
        coaId: req.body.coaId
      }
    })
      .then((coas) => {
        if(coas) {

          coas.update({

            coaName: (req.body.coaName != null) ? req.body.coaName : coas.coaName,

          })
            .then((coas) => {
              message = properties.get('message.coa.res.coaUpdated');
              type="success";
              res.status(HttpStatus.OK).json({message,coas,type});
            }, (err) => {
              console.dir(err);
              message = properties.get('message.res.errorInternalServer');
              res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
              next(err);
            });
        }
      }, (err) => {
        message = properties.get('message.coa.res.notDataToUpdate');
        res.status(HttpStatus.NOT_FOUND).json({message});
        next(err);
      });
  },

  updateValidToComercialAreas(req,res,next) { //Cambio de estados para oculatar usuario a eliminar

    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;

    models.comercialAreas.findOne({
      where: {
        coaId: req.body.coaId
      },
      coaValidTo: {
        [Op.gte]: dateTime
      }
    })
      .then((comercialareas) => {
        if (comercialareas) {

          comercialareas.update({

            coaValidTo: dateTime

          })
            .then((comercialareas) => {
              message = properties.get('message.coa.res.coaDeleted');
              type = "success";
              res.status(HttpStatus.OK).json({ message, comercialareas, type });
            }, (err) => {
              console.dir(err);
              message = properties.get('message.res.errorInternalServer');
              res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message });
              next(err);
            });
        }
      }, (err) => {
        message = properties.get('message.coa.res.notDataToDeleted');
        res.status(HttpStatus.NOT_FOUND).json({ message });
        next(err);
      });
  },

};
