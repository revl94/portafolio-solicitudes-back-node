const models = require('../models');
const Sequelize = require('sequelize');
const HttpStatus = require('http-status-codes');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(`/opt/node/backend/src/bin/common.properties`);
const Op = Sequelize.Op;
let message;
let type;

module.exports = {
    // FUNCION OBTENER TODOS LOS LIDERES CON FECHA VALIDA MAYOR AL DIA ACTUAL

    getAllLeaders(req, res, next) {

        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;

        models.leaders.findAll({
                where: {
                    leaValidTo: {
                        [Op.gt]: dateTime
                    }
                }
            })
            .then((leaders) => {
                if (leaders.length > 0) {
                    type = "success";
                    res.status(HttpStatus.OK).json({ leaders, type });
                } else {
                    message = properties.get('message.coa.res.notData');
                    type = "Not Data";
                    res.status(HttpStatus.OK).json({ leaders, type });
                }
            }, (err) => {
                console.dir(err);
                message = properties.get('message.res.errorInternalServer');
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message });
                next(err);
            });
    },

};