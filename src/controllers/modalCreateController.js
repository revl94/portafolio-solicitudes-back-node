const models = require('../models');
const Sequelize = require('sequelize');
const HttpStatus = require('http-status-codes');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(`/opt/node/backend/src/bin/common.properties`);
const Op = Sequelize.Op;
let message;
let type;

module.exports = {

    getAllRequests(req,res,next) {
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate());
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+' '+time;
        models.request.findAll({
                where: {
                    reqRealFinalDate: {
                        [Op.gt]: dateTime
                    }
                },
                include: [
                    {
                        model: models.client,
                        as: 'client',
                        require: true
                    },
                    {
                        model: models.comercialAreas,
                        as: 'comercialAreas',

                    },
                    {
                        model: models.entityStatus,
                        as: 'entityStatus'
                    },
                    {
                        model: models.requestType,
                        as: 'requestType'
                    },
                    {
                       model: models.technicalArea,
                        as: 'technicalArea' 
                    },
                    {
                       model: models.user,
                        as: 'user' 
                    }
                ],
            order: [
                [models.client, 'cliName', 'ASC'],
                ['reqPriority', 'ASC'],

            ],
            })
            .then((request) => {

                if(request.length > 0) {
                    type="success";
                    res.status(HttpStatus.OK).json(request);
                } else {
                    message=properties.get('message.request.res.notData');
                    type="Not Data";
                    res.status(HttpStatus.OK).json({message,request,type});
                }
            },(err) => {
                console.dir(err);
                message = properties.get('message.res.errorInternalServer');
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                next(err);
            });
    },
    // Creación de Solicitud
    CreateRequest (req,res,next){
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate());
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+' '+time;
        let body = req.body;
        models.request.create({
            cliId: body.cliId,
            coaId: body.coaId,
            leaId: body.leaId,
            typId: body.typId,
            estId: (body.estId != null) ? body.estId : 1,
            teaId:(body.teaId != null) ? body.teaId : null,
            reqTitle: body.reqTitle,
            reqDescription: body.reqDescription,
            reqPriority: (body.reqPriority != null) ? body.reqPriority : 0,
            reqRequestDate: (body.reqRequestDate === dateTime) ? body.reqRequestDate : dateTime,
            reqInitialDate: (body.reqInitialDate != null) ? body.reqInitialDate : "9999-12-31",
            reqPlanFinalDate: (body.reqPlanFinalDate != null) ? body.reqPlanFinalDate : "9999-12-31",
            reqRealFinalDate: (body.reqRealFinalDate != null) ? body.reqRealFinalDate : body.reqPlanFinalDate,
            reqUpdateStatusDate: (body.reqUpdateStatusDate != null) ? body.reqUpdateStatusDate : dateTime,
            reqAdvancePtge: (body.reqAdvancePtge != null) ? body.reqAdvancePtge : 0,
            reqDeviationsPtge: (body.reqDeviationsPtge != null) ? body.reqDeviationsPtge : 0,
            reqClientCompletedDeliverables: (body.reqClientCompletedDeliverables != null) ? body.reqClientCompletedDeliverables : "",
            reqClientPendingActivities: (body.reqClientPendingActivities != null) ? body.reqClientPendingActivities : "",
            reqClientComments: (body.reqClientComments != null) ? body.reqClientComments : "",
            reqIntelixCompletedDeliverables: (body.reqIntelixCompletedDeliverables != null) ? body.reqIntelixCompletedDeliverables : "",
            reqIntelixPendingActivities: (body.reqIntelixPendingActivities != null) ? body.reqIntelixPendingActivities : "",
            reqIntelixComments: (body.reqIntelixComments != null) ? body.reqIntelixComments : "",
            reqSendToComitee: (body.reqSendToComitee != null) ? body.reqSendToComitee : 0,
            reqComiteeAgenda: (body.reqComiteeAgenda != null) ? body.reqComiteeAgenda : "",

        })
            .then((request) => {
                message = properties.get('message.request.res.okCreated');
                type = "success";
                res.status(HttpStatus.OK).json({message, request, type});
            }, (err) => {
                console.dir(err);
                message = properties.get('message.res.errorInternalServer');
                next(err);
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
            });
    },
    UpdateRequest(req,res,next) {
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate());
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+' '+time;
        models.request.findOne({
            where: {
                reqId: req.params.id
            }
        })
            .then((request) => {
                if (request) {
                    let body = req.body
                    request.update({
                        cliId: (body.cliId != null) ? body.cliId : request.cliId,
                        coaId: (body.coaId != null) ? body.coaId : request.coaId,
                        leaId: (body.leaId != null) ? body.leaId : request.leaId,
                        typId: (body.typId != null) ? body.typId : request.typId,
                        estId: (body.estId != null) ? body.estId : request.estId,
                        teaId: (body.teaId != null) ? body.teaId : null,
                        reqTitle: (body.reqTitle != null) ? body.reqTitle : request.reqTitle,
                        reqDescription: (body.reqDescription != null) ? body.reqDescription : request.reqDescription,
                        reqPriority: (body.reqPriority != null) ? body.reqPriority : request.reqPriority,
                        reqInitialDate: (body.reqInitialDate !=null) ? body.reqInitialDate : request.reqInitialDate,
                        reqPlanFinalDate: (body.reqPlanFinalDate !=null) ? body.reqPlanFinalDate : request.reqPlanFinalDate,
                        reqRealFinalDate: (body.reqRealFinalDate !=null) ? body.reqRealFinalDate : request.reqRealFinalDate,
                        reqUpdateStatusDate: dateTime,
                        reqAdvancePtge: (body.reqAdvancePtge !=null) ? body.reqAdvancePtge : request.reqAdvancePtge,
                        reqDeviationsPtge: (body.reqDeviationsPtge !=null) ? body.reqDeviationsPtge : request.reqDeviationsPtge,
                        reqClientCompletedDeliverables: (body.reqClientCompletedDeliverables != null) ? body.reqClientCompletedDeliverables : request.reqClientCompletedDeliverables,
                        reqClientComments: (body.reqClientComments != null) ? body.reqClientComments : request.reqClientComments,
                        reqClientPendingActivities: (body.reqClientPendingActivities != null) ? body.reqClientPendingActivities : request.reqClientPendingActivities,
                        reqIntelixCompletedDeliverables: (body.reqIntelixCompletedDeliverables != null) ? body.reqIntelixCompletedDeliverables : request.reqIntelixCompletedDeliverables,
                        reqIntelixPendingActivities: (body.reqIntelixPendingActivities != null) ? body.reqIntelixPendingActivities : request.reqIntelixPendingActivities,
                        reqIntelixComments: (body.reqIntelixComments != null) ? body.reqIntelixComments : request.reqIntelixComments,
                        reqSendToComitee: (body.reqSendToComitee != null) ? body.reqSendToComitee : request.reqSendToComitee,
                        reqComiteeAgenda: (body.reqComiteeAgenda != null) ? body.reqComiteeAgenda : request.reqComiteeAgenda,

                    })
                        .then((request) => {
                            message = properties.get('message.request.res.reqUpdated');
                            type = "success";
                            res.status(HttpStatus.OK).json({message, request, type});
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
    UpdateClientRequest(req,res,next) {
        models.request.findOne({
            where: {
                reqId: req.params.id
            }
        })
            .then((request) => {
                if (request) {
                    let body = req.body
                    request.update({
                        reqPriority: (body.reqPriority !=null) ? body.reqPriority : "0",
                        reqClientCompletedDeliverables: (body.reqClientCompletedDeliverables !=null) ? body.reqClientCompletedDeliverables : "",
                        reqClientComments: (body.reqClientComments !=null) ? body.reqClientComments : "",
                        reqClientPendingActivities: (body.reqClientPendingActivities !=null) ? body.reqClientPendingActivities : "",
                    })
                        .then((request) => {
                            message = properties.get('message.request.res.reqUpdated');
                            type = "success";
                            res.status(HttpStatus.OK).json({message, request, type});
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

     UpdateRequestDate(req,res,next) {
         let today = new Date();
         let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
         let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
         let dateTime = date+' '+time;
        models.request.findOne({
            where: {
                reqId: req.body.reqId
            }
        })
            .then((request) => {
                if (request) {
                    request.update({
                        reqRealFinalDate: dateTime
                    })
                        .then((request) => {
                            message = properties.get('message.request.res.reqUpdated');
                            type = "success";
                            res.status(HttpStatus.OK).json({message, request, type});
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
    getPorfolioById(req, res, next) {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate());
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;

        let cliId = (req.query.cliId.length !== 0) ? req.query.cliId : "0";
        let coaId = (req.query.coaId.length !== 0) ? req.query.coaId : "0";
        let estId = (req.query.estId.length !== 0) ? req.query.estId : "0";
        let desde = (req.query.desde != null) ? req.query.desde : "0000-12-30";
        let hasta = (req.query.hasta != null) ? req.query.hasta : "0000-12-31";
        let rbutton = (req.query.rbutton != null) ? req.query.rbutton : 0;



        let cliIdArray = cliId.split(",");
        let coaIdArray = coaId.split(",");
        let estIdArray = estId.split(",");


        switch (rbutton) {

            case '1':
                desdereqRequestDate = desde;
                hastareqRequestDate = hasta;
                desdereqInitialDate = "0000-12-30";
                hastareqInitialDate = "0000-12-31";
                desdereqPlanFinalDate = "0000-12-30";
                hastareqPlanFinalDate = "0000-12-31";
                desdereqRealFinalDate = "0000-12-30";
                hastareqRealFinalDate = "0000-12-31";

                break;
            case '2':
                desdereqRequestDate = "0000-12-30";
                hastareqRequestDate = "0000-12-31";
                desdereqInitialDate = desde;
                hastareqInitialDate = hasta;
                desdereqPlanFinalDate = "0000-12-30";
                hastareqPlanFinalDate = "0000-12-31";
                desdereqRealFinalDate = "0000-12-30";
                hastareqRealFinalDate = "0000-12-31";

                break;

            case '3':
                desdereqRequestDate = "0000-12-30";
                hastareqRequestDate = "0000-12-31";
                desdereqInitialDate = "0000-12-30";
                hastareqInitialDate = "0000-12-31";
                desdereqPlanFinalDate = desde;
                hastareqPlanFinalDate = hasta;
                desdereqRealFinalDate = "0000-12-30";
                hastareqRealFinalDate = "0000-12-31";

                break;

            case '4':
                desdereqRequestDate = "0000-12-30";
                hastareqRequestDate = "0000-12-31";
                desdereqInitialDate = "0000-12-30";
                hastareqInitialDate = "0000-12-31";
                desdereqPlanFinalDate = "0000-12-30";
                hastareqPlanFinalDate = "0000-12-31";
                desdereqRealFinalDate = desde;
                hastareqRealFinalDate = hasta;

                break;

            default:
                desdereqRequestDate = "0000-12-30";
                hastareqRequestDate = "0000-12-31";
                desdereqInitialDate = "0000-12-30";
                hastareqInitialDate = "0000-12-31";
                desdereqPlanFinalDate = "0000-12-30";
                hastareqPlanFinalDate = "0000-12-31";
                desdereqRealFinalDate = "0000-12-30";
                hastareqRealFinalDate = "0000-12-31";


                break;


        }
        
        if (desdereqRequestDate === "0000-12-30" && desdereqInitialDate === "0000-12-30" && desdereqPlanFinalDate === "0000-12-30"
        && desdereqRealFinalDate === "0000-12-30") {
            if (cliId !== '0' && coaId !== '0' && estId !== '0') {

                models.request.findAll({
                    where: {
                        reqRealFinalDate: {
                            [Op.gt]: dateTime
                        },
                        [Op.or]: {

                            [Op.and]: {
                                cliId: {[Op.in]: cliIdArray},
                                coaId: {[Op.in]: coaIdArray},
                                estId: {[Op.in]: estIdArray},

                            },

                        }
                    },
                    include: [
                        {
                            model: models.client,
                            as: 'client',
                            require: true

                        },
                        {
                            model: models.comercialAreas,
                            as: 'comercialAreas',

                        },
                        {
                            model: models.entityStatus,
                            as: 'entityStatus'
                        },
                        {
                            model: models.requestType,
                            as: 'requestType'
                        },
                        {
                            model: models.technicalArea,
                            as: 'technicalArea'
                        },
                        {
                            model: models.user,
                            as: 'user'
                        }
                    ],
                    order: [
                        [models.client, 'cliName', 'ASC'],
                        ['reqPriority', 'ASC'],

                    ],

                })
                    .then((porfolio) => {
                        if (porfolio) {
                            type = "success";

                            res.status(HttpStatus.OK).json({message, porfolio, type});
                        }
                    }, (err) => {
                        console.dir(err);
                        message = properties.get('message.res.errorInternalServer');
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                        next(err);
                    });
            } else if (cliId !== '0' && coaId === '0' && estId !== '0') {
                models.request.findAll({
                    where: {
                        reqRealFinalDate: {
                            [Op.gt]: dateTime
                        },
                        [Op.or]: {

                            [Op.and]: {
                                cliId: {[Op.in]: cliIdArray},
                                estId: {[Op.in]: estIdArray},

                            },

                        }
                    },
                    include: [
                        {
                            model: models.client,
                            as: 'client',
                            require: true

                        },
                        {
                            model: models.comercialAreas,
                            as: 'comercialAreas',

                        },
                        {
                            model: models.entityStatus,
                            as: 'entityStatus'
                        },
                        {
                            model: models.requestType,
                            as: 'requestType'
                        },
                        {
                            model: models.technicalArea,
                            as: 'technicalArea'
                        },
                        {
                            model: models.user,
                            as: 'user'
                        }
                    ],
                    order: [
                        [models.client, 'cliName', 'ASC'],
                        ['reqPriority', 'ASC'],

                    ],

                })
                    .then((porfolio) => {
                        if (porfolio) {
                            type = "success";

                            res.status(HttpStatus.OK).json({message, porfolio, type});
                        }
                    }, (err) => {
                        console.dir(err);
                        message = properties.get('message.res.errorInternalServer');
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                        next(err);
                    });
            } else if (cliId === '0' && coaId !== '0' && estId !== '0') {
                models.request.findAll({
                    where: {
                        reqRealFinalDate: {
                            [Op.gt]: dateTime
                        },
                        [Op.or]: {

                            [Op.and]: {
                                coaId: {[Op.in]: coaIdArray},
                                estId: {[Op.in]: estIdArray},

                            },

                        }
                    },
                    include: [
                        {
                            model: models.client,
                            as: 'client',
                            require: true

                        },
                        {
                            model: models.comercialAreas,
                            as: 'comercialAreas',

                        },
                        {
                            model: models.entityStatus,
                            as: 'entityStatus'
                        },
                        {
                            model: models.requestType,
                            as: 'requestType'
                        },
                        {
                            model: models.technicalArea,
                            as: 'technicalArea'
                        },
                        {
                            model: models.user,
                            as: 'user'
                        }
                    ],
                    order: [
                        [models.client, 'cliName', 'ASC'],
                        ['reqPriority', 'ASC'],

                    ],

                })
                    .then((porfolio) => {
                        if (porfolio) {
                            type = "success";

                            res.status(HttpStatus.OK).json({message, porfolio, type});
                        }
                    }, (err) => {
                        console.dir(err);
                        message = properties.get('message.res.errorInternalServer');
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                        next(err);
                    });
            } else if (cliId === '0' && coaId === '0' && estId !== '0') {
                models.request.findAll({
                    where: {
                        reqRealFinalDate: {
                            [Op.gt]: dateTime
                        },
                        estId: {
                            [Op.in]: estIdArray
                        },

                    },
                    include: [
                        {
                            model: models.client,
                            as: 'client',
                            require: true

                        },
                        {
                            model: models.comercialAreas,
                            as: 'comercialAreas',

                        },
                        {
                            model: models.entityStatus,
                            as: 'entityStatus'
                        },
                        {
                            model: models.requestType,
                            as: 'requestType'
                        },
                        {
                            model: models.technicalArea,
                            as: 'technicalArea'
                        },
                        {
                            model: models.user,
                            as: 'user'
                        }
                    ],
                    order: [
                        [models.client, 'cliName', 'ASC'],
                        ['reqPriority', 'ASC'],

                    ],

                })
                    .then((porfolio) => {
                        if (porfolio) {
                            type = "success";

                            res.status(HttpStatus.OK).json({message, porfolio, type});
                        }
                    }, (err) => {
                        console.dir(err);
                        message = properties.get('message.res.errorInternalServer');
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                        next(err);
                    });
            }
        } else {
            if (cliId !== '0' && coaId !== '0' && estId !== '0') {

                models.request.findAll({
                    where: {
                        reqRealFinalDate: {
                            [Op.gt]: dateTime
                        },
                        [Op.or]: {

                            [Op.and]: {
                                cliId: {[Op.in]: cliIdArray},
                                coaId: {[Op.in]: coaIdArray},
                                estId: {[Op.in]: estIdArray},
                                [Op.or]: {
                                    reqRequestDate: {[Op.between]: [desdereqRequestDate, hastareqRequestDate],},
                                    reqInitialDate: {[Op.between]: [desdereqInitialDate, hastareqInitialDate],},
                                    reqPlanFinalDate: {[Op.between]: [desdereqPlanFinalDate, hastareqPlanFinalDate],},
                                    reqRealFinalDate: {[Op.between]: [desdereqRealFinalDate, hastareqRealFinalDate],},
                                }

                            },

                        }
                    },
                    include: [
                        {
                            model: models.client,
                            as: 'client',
                            require: true

                        },
                        {
                            model: models.comercialAreas,
                            as: 'comercialAreas',

                        },
                        {
                            model: models.entityStatus,
                            as: 'entityStatus'
                        },
                        {
                            model: models.requestType,
                            as: 'requestType'
                        },
                        {
                            model: models.technicalArea,
                            as: 'technicalArea'
                        },
                        {
                            model: models.user,
                            as: 'user'
                        }
                    ],
                    order: [
                        [models.client, 'cliName', 'ASC'],
                        ['reqPriority', 'ASC'],

                    ],

                })
                    .then((porfolio) => {
                        if (porfolio) {
                            type = "success";

                            res.status(HttpStatus.OK).json({message, porfolio, type});
                        }
                    }, (err) => {
                        console.dir(err);
                        message = properties.get('message.res.errorInternalServer');
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                        next(err);
                    });
            } else if (cliId !== '0' && coaId === '0' && estId !== '0') {
                models.request.findAll({
                    where: {
                        reqRealFinalDate: {
                            [Op.gt]: dateTime
                        },
                        [Op.or]: {

                            [Op.and]: {
                                cliId: {[Op.in]: cliIdArray},
                                estId: {[Op.in]: estIdArray},
                                [Op.or]: {
                                    reqRequestDate: {[Op.between]: [desdereqRequestDate, hastareqRequestDate],},
                                    reqInitialDate: {[Op.between]: [desdereqInitialDate, hastareqInitialDate],},
                                    reqPlanFinalDate: {[Op.between]: [desdereqPlanFinalDate, hastareqPlanFinalDate],},
                                    reqRealFinalDate: {[Op.between]: [desdereqRealFinalDate, hastareqRealFinalDate],},
                                }

                            },

                        }
                    },
                    include: [
                        {
                            model: models.client,
                            as: 'client',
                            require: true

                        },
                        {
                            model: models.comercialAreas,
                            as: 'comercialAreas',

                        },
                        {
                            model: models.entityStatus,
                            as: 'entityStatus'
                        },
                        {
                            model: models.requestType,
                            as: 'requestType'
                        },
                        {
                            model: models.technicalArea,
                            as: 'technicalArea'
                        },
                        {
                            model: models.user,
                            as: 'user'
                        }
                    ],
                    order: [
                        [models.client, 'cliName', 'ASC'],
                        ['reqPriority', 'ASC'],

                    ],

                })
                    .then((porfolio) => {
                        if (porfolio) {
                            type = "success";

                            res.status(HttpStatus.OK).json({message, porfolio, type});
                        }
                    }, (err) => {
                        console.dir(err);
                        message = properties.get('message.res.errorInternalServer');
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                        next(err);
                    });
            } else if (cliId === '0' && coaId !== '0' && estId !== '0') {
                models.request.findAll({
                    where: {
                        reqRealFinalDate: {
                            [Op.gt]: dateTime
                        },
                        [Op.or]: {

                            [Op.and]: {
                                coaId: {[Op.in]: coaIdArray},
                                estId: {[Op.in]: estIdArray},
                                [Op.or]: {
                                    reqRequestDate: {[Op.between]: [desdereqRequestDate, hastareqRequestDate],},
                                    reqInitialDate: {[Op.between]: [desdereqInitialDate, hastareqInitialDate],},
                                    reqPlanFinalDate: {[Op.between]: [desdereqPlanFinalDate, hastareqPlanFinalDate],},
                                    reqRealFinalDate: {[Op.between]: [desdereqRealFinalDate, hastareqRealFinalDate],},
                                }

                            },

                        }
                    },
                    include: [
                        {
                            model: models.client,
                            as: 'client',
                            require: true

                        },
                        {
                            model: models.comercialAreas,
                            as: 'comercialAreas',

                        },
                        {
                            model: models.entityStatus,
                            as: 'entityStatus'
                        },
                        {
                            model: models.requestType,
                            as: 'requestType'
                        },
                        {
                            model: models.technicalArea,
                            as: 'technicalArea'
                        },
                        {
                            model: models.user,
                            as: 'user'
                        }
                    ],
                    order: [
                        [models.client, 'cliName', 'ASC'],
                        ['reqPriority', 'ASC'],

                    ],

                })
                    .then((porfolio) => {
                        if (porfolio) {
                            type = "success";

                            res.status(HttpStatus.OK).json({message, porfolio, type});
                        }
                    }, (err) => {
                        console.dir(err);
                        message = properties.get('message.res.errorInternalServer');
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                        next(err);
                    });
            } else if (cliId === '0' && coaId === '0' && estId !== '0') {
                models.request.findAll({
                    where: {
                        reqRealFinalDate: {
                            [Op.gt]: dateTime
                        },
                        estId: {
                            [Op.in]: estIdArray
                        },
                        [Op.or]: {
                                    reqRequestDate: {[Op.between]: [desdereqRequestDate, hastareqRequestDate],},
                                    reqInitialDate: {[Op.between]: [desdereqInitialDate, hastareqInitialDate],},
                                    reqPlanFinalDate: {[Op.between]: [desdereqPlanFinalDate, hastareqPlanFinalDate],},
                                    reqRealFinalDate: {[Op.between]: [desdereqRealFinalDate, hastareqRealFinalDate],},
                        }
                    },
                    include: [
                        {
                            model: models.client,
                            as: 'client',
                            require: true

                        },
                        {
                            model: models.comercialAreas,
                            as: 'comercialAreas',

                        },
                        {
                            model: models.entityStatus,
                            as: 'entityStatus'
                        },
                        {
                            model: models.requestType,
                            as: 'requestType'
                        },
                        {
                            model: models.technicalArea,
                            as: 'technicalArea'
                        },
                        {
                            model: models.user,
                            as: 'user'
                        }
                    ],
                    order: [
                        [models.client, 'cliName', 'ASC'],
                        ['reqPriority', 'ASC'],

                    ],

                })
                    .then((porfolio) => {
                        if (porfolio) {
                            type = "success";

                            res.status(HttpStatus.OK).json({message, porfolio, type});
                        }
                    }, (err) => {
                        console.dir(err);
                        message = properties.get('message.res.errorInternalServer');
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                        next(err);
                    });
            }
        }



    },
    getPorfolioByIdNoPmo(req, res, next) {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate());
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;

        let cliId = (req.query.cliId.length !== 0) ? req.query.cliId : "0";
        let coaId = (req.query.coaId.length !== 0) ? req.query.coaId : "0";
        let estId = (req.query.estId.length !== 0) ? req.query.estId : "0";
        let desde = (req.query.desde != null) ? req.query.desde : "0000-12-30";
        let hasta = (req.query.hasta != null) ? req.query.hasta : "0000-12-31";
        let rbutton = (req.query.rbutton != null) ? req.query.rbutton : 0;



        let cliIdArray = cliId.split(",");
        let coaIdArray = coaId.split(",");
        let estIdArray = estId.split(",");


        switch (rbutton) {

            case '1':
                desdereqRequestDate = desde;
                hastareqRequestDate = hasta;
                desdereqInitialDate = "0000-12-30";
                hastareqInitialDate = "0000-12-31";
                desdereqPlanFinalDate = "0000-12-30";
                hastareqPlanFinalDate = "0000-12-31";
                desdereqRealFinalDate = "0000-12-30";
                hastareqRealFinalDate = "0000-12-31";

                break;
            case '2':
                desdereqRequestDate = "0000-12-30";
                hastareqRequestDate = "0000-12-31";
                desdereqInitialDate = desde;
                hastareqInitialDate = hasta;
                desdereqPlanFinalDate = "0000-12-30";
                hastareqPlanFinalDate = "0000-12-31";
                desdereqRealFinalDate = "0000-12-30";
                hastareqRealFinalDate = "0000-12-31";

                break;

            case '3':
                desdereqRequestDate = "0000-12-30";
                hastareqRequestDate = "0000-12-31";
                desdereqInitialDate = "0000-12-30";
                hastareqInitialDate = "0000-12-31";
                desdereqPlanFinalDate = desde;
                hastareqPlanFinalDate = hasta;
                desdereqRealFinalDate = "0000-12-30";
                hastareqRealFinalDate = "0000-12-31";

                break;

            case '4':
                desdereqRequestDate = "0000-12-30";
                hastareqRequestDate = "0000-12-31";
                desdereqInitialDate = "0000-12-30";
                hastareqInitialDate = "0000-12-31";
                desdereqPlanFinalDate = "0000-12-30";
                hastareqPlanFinalDate = "0000-12-31";
                desdereqRealFinalDate = desde;
                hastareqRealFinalDate = hasta;

                break;

            default:
                desdereqRequestDate = "0000-12-30";
                hastareqRequestDate = "0000-12-31";
                desdereqInitialDate = "0000-12-30";
                hastareqInitialDate = "0000-12-31";
                desdereqPlanFinalDate = "0000-12-30";
                hastareqPlanFinalDate = "0000-12-31";
                desdereqRealFinalDate = "0000-12-30";
                hastareqRealFinalDate = "0000-12-31";


                break;


        }

        if (desdereqRequestDate === "0000-12-30" && desdereqInitialDate === "0000-12-30" && desdereqPlanFinalDate === "0000-12-30"
            && desdereqRealFinalDate === "0000-12-30") {
            if (coaId !== '0' && estId !== '0' && cliId !== '0') {

                models.request.findAll({
                    where: {
                        reqRealFinalDate: {
                            [Op.gt]: dateTime
                        },
                        cliId: {
                            [Op.in]: cliIdArray
                        },
                        [Op.or]: {

                            [Op.and]: {
                                coaId: {[Op.in]: coaIdArray},
                                estId: {[Op.in]: estIdArray},

                            },

                        }
                    },
                    include: [
                        {
                            model: models.client,
                            as: 'client',
                            require: true

                        },
                        {
                            model: models.comercialAreas,
                            as: 'comercialAreas',

                        },
                        {
                            model: models.entityStatus,
                            as: 'entityStatus'
                        },
                        {
                            model: models.requestType,
                            as: 'requestType'
                        },
                        {
                            model: models.technicalArea,
                            as: 'technicalArea'
                        },
                        {
                            model: models.user,
                            as: 'user'
                        }
                    ],
                    order: [
                        [models.client, 'cliName', 'ASC'],
                        ['reqPriority', 'ASC'],

                    ],

                })
                    .then((porfolio) => {
                        if (porfolio) {
                            type = "success";

                            res.status(HttpStatus.OK).json({message, porfolio, type});
                        }
                    }, (err) => {
                        console.dir(err);
                        message = properties.get('message.res.errorInternalServer');
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                        next(err);
                    });


            } else if (coaId === '0' && estId !== '0' && cliId !== '0') {

                models.request.findAll({
                    where: {
                        reqRealFinalDate: {
                            [Op.gt]: dateTime
                        },
                        cliId: {
                            [Op.in]: cliIdArray
                        },
                        estId: {
                            [Op.in]: estIdArray
                        },

                    },
                    include: [
                        {
                            model: models.client,
                            as: 'client',
                            require: true

                        },
                        {
                            model: models.comercialAreas,
                            as: 'comercialAreas',

                        },
                        {
                            model: models.entityStatus,
                            as: 'entityStatus'
                        },
                        {
                            model: models.requestType,
                            as: 'requestType'
                        },
                        {
                            model: models.technicalArea,
                            as: 'technicalArea'
                        },
                        {
                            model: models.user,
                            as: 'user'
                        }
                    ],
                    order: [
                        [models.client, 'cliName', 'ASC'],
                        ['reqPriority', 'ASC'],

                    ],

                })
                    .then((porfolio) => {
                        if (porfolio) {
                            type = "success";

                            res.status(HttpStatus.OK).json({message, porfolio, type});
                        }
                    }, (err) => {
                        console.dir(err);
                        message = properties.get('message.res.errorInternalServer');
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                        next(err);
                    });

            }
        } else {
            if (coaId !== '0' && estId !== '0' && cliId !== '0') {

                models.request.findAll({
                    where: {
                        reqRealFinalDate: {
                            [Op.gt]: dateTime
                        },
                        cliId: {
                            [Op.in]: cliIdArray
                        },
                        [Op.or]: {

                            [Op.and]: {
                                coaId: {[Op.in]: coaIdArray},
                                estId: {[Op.in]: estIdArray},
                                [Op.or]: {
                                    reqRequestDate: {[Op.between]: [desdereqRequestDate, hastareqRequestDate],},
                                    reqInitialDate: {[Op.between]: [desdereqInitialDate, hastareqInitialDate],},
                                    reqPlanFinalDate: {[Op.between]: [desdereqPlanFinalDate, hastareqPlanFinalDate],},
                                    reqRealFinalDate: {[Op.between]: [desdereqRealFinalDate, hastareqRealFinalDate],},
                                }

                            },

                        }
                    },
                    include: [
                        {
                            model: models.client,
                            as: 'client',
                            require: true

                        },
                        {
                            model: models.comercialAreas,
                            as: 'comercialAreas',

                        },
                        {
                            model: models.entityStatus,
                            as: 'entityStatus'
                        },
                        {
                            model: models.requestType,
                            as: 'requestType'
                        },
                        {
                            model: models.technicalArea,
                            as: 'technicalArea'
                        },
                        {
                            model: models.user,
                            as: 'user'
                        }
                    ],
                    order: [
                        [models.client, 'cliName', 'ASC'],
                        ['reqPriority', 'ASC'],

                    ],

                })
                    .then((porfolio) => {
                        if (porfolio) {
                            type = "success";

                            res.status(HttpStatus.OK).json({message, porfolio, type});
                        }
                    }, (err) => {
                        console.dir(err);
                        message = properties.get('message.res.errorInternalServer');
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                        next(err);
                    });
            } else if (coaId === '0' && estId !== '0' && cliId !== '0') {
                models.request.findAll({
                    where: {
                        reqRealFinalDate: {
                            [Op.gt]: dateTime
                        },
                        cliId: {
                            [Op.in]: cliIdArray
                        },
                        estId: {
                            [Op.in]: estIdArray
                        },
                        [Op.or]: {
                            reqRequestDate: {[Op.between]: [desdereqRequestDate, hastareqRequestDate],},
                            reqInitialDate: {[Op.between]: [desdereqInitialDate, hastareqInitialDate],},
                            reqPlanFinalDate: {[Op.between]: [desdereqPlanFinalDate, hastareqPlanFinalDate],},
                            reqRealFinalDate: {[Op.between]: [desdereqRealFinalDate, hastareqRealFinalDate],},
                        }

                    },
                    include: [
                        {
                            model: models.client,
                            as: 'client',
                            require: true

                        },
                        {
                            model: models.comercialAreas,
                            as: 'comercialAreas',

                        },
                        {
                            model: models.entityStatus,
                            as: 'entityStatus'
                        },
                        {
                            model: models.requestType,
                            as: 'requestType'
                        },
                        {
                            model: models.technicalArea,
                            as: 'technicalArea'
                        },
                        {
                            model: models.user,
                            as: 'user'
                        }
                    ],
                    order: [
                        [models.client, 'cliName', 'ASC'],
                        ['reqPriority', 'ASC'],

                    ],

                })
                    .then((porfolio) => {
                        if (porfolio) {
                            type = "success";

                            res.status(HttpStatus.OK).json({message, porfolio, type});
                        }
                    }, (err) => {
                        console.dir(err);
                        message = properties.get('message.res.errorInternalServer');
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                        next(err);
                    });

            }

        }
    },
    getPorfolioByIdNoClient(req, res, next) {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate());
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;

        let cliId = (req.query.cliId.length !== 0) ? req.query.cliId : "0";
        let coaId = (req.query.coaId.length !== 0) ? req.query.coaId : "0";
        let estId = (req.query.estId.length !== 0) ? req.query.estId : "0";
        let desde = (req.query.desde != null) ? req.query.desde : "0000-12-30";
        let hasta = (req.query.hasta != null) ? req.query.hasta : "0000-12-31";
        let rbutton = (req.query.rbutton != null) ? req.query.rbutton : 0;
        let leaId = (req.query.leaId.length !== 0) ? req.query.leaId : "0";



        let cliIdArray = cliId.split(",");
        let leaIdArray = leaId.split(",");
        let coaIdArray = coaId.split(",");
        let estIdArray = estId.split(",");


        switch (rbutton) {

            case '1':
                desdereqRequestDate = desde;
                hastareqRequestDate = hasta;
                desdereqInitialDate = "0000-12-30";
                hastareqInitialDate = "0000-12-31";
                desdereqPlanFinalDate = "0000-12-30";
                hastareqPlanFinalDate = "0000-12-31";
                desdereqRealFinalDate = "0000-12-30";
                hastareqRealFinalDate = "0000-12-31";

                break;
            case '2':
                desdereqRequestDate = "0000-12-30";
                hastareqRequestDate = "0000-12-31";
                desdereqInitialDate = desde;
                hastareqInitialDate = hasta;
                desdereqPlanFinalDate = "0000-12-30";
                hastareqPlanFinalDate = "0000-12-31";
                desdereqRealFinalDate = "0000-12-30";
                hastareqRealFinalDate = "0000-12-31";

                break;

            case '3':
                desdereqRequestDate = "0000-12-30";
                hastareqRequestDate = "0000-12-31";
                desdereqInitialDate = "0000-12-30";
                hastareqInitialDate = "0000-12-31";
                desdereqPlanFinalDate = desde;
                hastareqPlanFinalDate = hasta;
                desdereqRealFinalDate = "0000-12-30";
                hastareqRealFinalDate = "0000-12-31";

                break;

            case '4':
                desdereqRequestDate = "0000-12-30";
                hastareqRequestDate = "0000-12-31";
                desdereqInitialDate = "0000-12-30";
                hastareqInitialDate = "0000-12-31";
                desdereqPlanFinalDate = "0000-12-30";
                hastareqPlanFinalDate = "0000-12-31";
                desdereqRealFinalDate = desde;
                hastareqRealFinalDate = hasta;

                break;

            default:
                desdereqRequestDate = "0000-12-30";
                hastareqRequestDate = "0000-12-31";
                desdereqInitialDate = "0000-12-30";
                hastareqInitialDate = "0000-12-31";
                desdereqPlanFinalDate = "0000-12-30";
                hastareqPlanFinalDate = "0000-12-31";
                desdereqRealFinalDate = "0000-12-30";
                hastareqRealFinalDate = "0000-12-31";


                break;


        }

        if (desdereqRequestDate === "0000-12-30" && desdereqInitialDate === "0000-12-30" && desdereqPlanFinalDate === "0000-12-30"
            && desdereqRealFinalDate === "0000-12-30") {
            if (coaId !== '0' && estId !== '0' && cliId !== '0') {

                models.request.findAll({
                    where: {
                        reqRealFinalDate: {
                            [Op.gt]: dateTime
                        },
                        leaId: {
                            [Op.in]: leaIdArray
                        },
                        [Op.or]: {

                            [Op.and]: {
                                cliId: {[Op.in]: cliIdArray},
                                coaId: {[Op.in]: coaIdArray},
                                estId: {[Op.in]: estIdArray},

                            },

                        }
                    },
                    include: [
                        {
                            model: models.client,
                            as: 'client',
                            require: true

                        },
                        {
                            model: models.comercialAreas,
                            as: 'comercialAreas',

                        },
                        {
                            model: models.entityStatus,
                            as: 'entityStatus'
                        },
                        {
                            model: models.requestType,
                            as: 'requestType'
                        },
                        {
                            model: models.technicalArea,
                            as: 'technicalArea'
                        },
                        {
                            model: models.user,
                            as: 'user'
                        }
                    ],
                    order: [
                        [models.client, 'cliName', 'ASC'],
                        ['reqPriority', 'ASC'],

                    ],

                })
                    .then((porfolio) => {
                        if (porfolio) {
                            type = "success";

                            res.status(HttpStatus.OK).json({message, porfolio, type});
                        }
                    }, (err) => {
                        console.dir(err);
                        message = properties.get('message.res.errorInternalServer');
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                        next(err);
                    });


            } else if (coaId === '0' && estId !== '0' && cliId !== '0') {

                models.request.findAll({
                    where: {
                        reqRealFinalDate: {
                            [Op.gt]: dateTime
                        },
                        cliId: {
                            [Op.in]: cliIdArray
                        },
                        estId: {
                            [Op.in]: estIdArray
                        },
                        leaId: {
                            [Op.in]: leaIdArray
                        },

                    },
                    include: [
                        {
                            model: models.client,
                            as: 'client',
                            require: true

                        },
                        {
                            model: models.comercialAreas,
                            as: 'comercialAreas',

                        },
                        {
                            model: models.entityStatus,
                            as: 'entityStatus'
                        },
                        {
                            model: models.requestType,
                            as: 'requestType'
                        },
                        {
                            model: models.technicalArea,
                            as: 'technicalArea'
                        },
                        {
                            model: models.user,
                            as: 'user'
                        }
                    ],
                    order: [
                        [models.client, 'cliName', 'ASC'],
                        ['reqPriority', 'ASC'],

                    ],

                })
                    .then((porfolio) => {
                        if (porfolio) {
                            type = "success";

                            res.status(HttpStatus.OK).json({message, porfolio, type});
                        }
                    }, (err) => {
                        console.dir(err);
                        message = properties.get('message.res.errorInternalServer');
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                        next(err);
                    });

            } else if (coaId === '0' && estId !== '0' && cliId === '0') {
                models.request.findAll({
                    where: {
                        reqRealFinalDate: {
                            [Op.gt]: dateTime
                        },
                        estId: {
                            [Op.in]: estIdArray
                        },
                        leaId: {
                            [Op.in]: leaIdArray
                        },

                    },
                    include: [
                        {
                            model: models.client,
                            as: 'client',
                            require: true

                        },
                        {
                            model: models.comercialAreas,
                            as: 'comercialAreas',

                        },
                        {
                            model: models.entityStatus,
                            as: 'entityStatus'
                        },
                        {
                            model: models.requestType,
                            as: 'requestType'
                        },
                        {
                            model: models.technicalArea,
                            as: 'technicalArea'
                        },
                        {
                            model: models.user,
                            as: 'user'
                        }
                    ],
                    order: [
                        [models.client, 'cliName', 'ASC'],
                        ['reqPriority', 'ASC'],

                    ],

                })
                    .then((porfolio) => {
                        if (porfolio) {
                            type = "success";

                            res.status(HttpStatus.OK).json({message, porfolio, type});
                        }
                    }, (err) => {
                        console.dir(err);
                        message = properties.get('message.res.errorInternalServer');
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                        next(err);
                    });
            } else if (coaId !== '0' && estId !== '0' && cliId === '0') {
                models.request.findAll({
                    where: {
                        reqRealFinalDate: {
                            [Op.gt]: dateTime
                        },
                        estId: {
                            [Op.in]: estIdArray
                        },
                        leaId: {
                            [Op.in]: leaIdArray
                        },
                        coaId: {
                            [Op.in]: coaIdArray
                        },

                    },
                    include: [
                        {
                            model: models.client,
                            as: 'client',
                            require: true

                        },
                        {
                            model: models.comercialAreas,
                            as: 'comercialAreas',

                        },
                        {
                            model: models.entityStatus,
                            as: 'entityStatus'
                        },
                        {
                            model: models.requestType,
                            as: 'requestType'
                        },
                        {
                            model: models.technicalArea,
                            as: 'technicalArea'
                        },
                        {
                            model: models.user,
                            as: 'user'
                        }
                    ],
                    order: [
                        [models.client, 'cliName', 'ASC'],
                        ['reqPriority', 'ASC'],

                    ],

                })
                    .then((porfolio) => {
                        if (porfolio) {
                            type = "success";

                            res.status(HttpStatus.OK).json({message, porfolio, type});
                        }
                    }, (err) => {
                        console.dir(err);
                        message = properties.get('message.res.errorInternalServer');
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                        next(err);
                    });
            }
        } else {
            if (coaId !== '0' && estId !== '0' && cliId !== '0') {

                models.request.findAll({
                    where: {
                        reqRealFinalDate: {
                            [Op.gt]: dateTime
                        },
                        leaId: {
                            [Op.in]: leaIdArray
                        },
                        [Op.or]: {

                            [Op.and]: {
                                cliId: {[Op.in]: cliIdArray},
                                coaId: {[Op.in]: coaIdArray},
                                estId: {[Op.in]: estIdArray},
                                [Op.or]: {
                                    reqRequestDate: {[Op.between]: [desdereqRequestDate, hastareqRequestDate],},
                                    reqInitialDate: {[Op.between]: [desdereqInitialDate, hastareqInitialDate],},
                                    reqPlanFinalDate: {[Op.between]: [desdereqPlanFinalDate, hastareqPlanFinalDate],},
                                    reqRealFinalDate: {[Op.between]: [desdereqRealFinalDate, hastareqRealFinalDate],},
                                }

                            },

                        }
                    },
                    include: [
                        {
                            model: models.client,
                            as: 'client',
                            require: true

                        },
                        {
                            model: models.comercialAreas,
                            as: 'comercialAreas',

                        },
                        {
                            model: models.entityStatus,
                            as: 'entityStatus'
                        },
                        {
                            model: models.requestType,
                            as: 'requestType'
                        },
                        {
                            model: models.technicalArea,
                            as: 'technicalArea'
                        },
                        {
                            model: models.user,
                            as: 'user'
                        }
                    ],
                    order: [
                        [models.client, 'cliName', 'ASC'],
                        ['reqPriority', 'ASC'],

                    ],

                })
                    .then((porfolio) => {
                        if (porfolio) {
                            type = "success";

                            res.status(HttpStatus.OK).json({message, porfolio, type});
                        }
                    }, (err) => {
                        console.dir(err);
                        message = properties.get('message.res.errorInternalServer');
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                        next(err);
                    });
            } else if (coaId === '0' && estId !== '0' && cliId !== '0') {
                models.request.findAll({
                    where: {
                        reqRealFinalDate: {
                            [Op.gt]: dateTime
                        },
                        cliId: {
                            [Op.in]: cliIdArray
                        },
                        estId: {
                            [Op.in]: estIdArray
                        },
                        leaId: {
                            [Op.in]: leaIdArray
                        },
                        [Op.or]: {
                            reqRequestDate: {[Op.between]: [desdereqRequestDate, hastareqRequestDate],},
                            reqInitialDate: {[Op.between]: [desdereqInitialDate, hastareqInitialDate],},
                            reqPlanFinalDate: {[Op.between]: [desdereqPlanFinalDate, hastareqPlanFinalDate],},
                            reqRealFinalDate: {[Op.between]: [desdereqRealFinalDate, hastareqRealFinalDate],},
                        }

                    },
                    include: [
                        {
                            model: models.client,
                            as: 'client',
                            require: true

                        },
                        {
                            model: models.comercialAreas,
                            as: 'comercialAreas',

                        },
                        {
                            model: models.entityStatus,
                            as: 'entityStatus'
                        },
                        {
                            model: models.requestType,
                            as: 'requestType'
                        },
                        {
                            model: models.technicalArea,
                            as: 'technicalArea'
                        },
                        {
                            model: models.user,
                            as: 'user'
                        }
                    ],
                    order: [
                        [models.client, 'cliName', 'ASC'],
                        ['reqPriority', 'ASC'],

                    ],

                })
                    .then((porfolio) => {
                        if (porfolio) {
                            type = "success";

                            res.status(HttpStatus.OK).json({message, porfolio, type});
                        }
                    }, (err) => {
                        console.dir(err);
                        message = properties.get('message.res.errorInternalServer');
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                        next(err);
                    });

            } else if (coaId === '0' && estId !== '0' && cliId === '0') {
                models.request.findAll({
                    where: {
                        reqRealFinalDate: {
                            [Op.gt]: dateTime
                        },
                        estId: {
                            [Op.in]: estIdArray
                        },
                        leaId: {
                            [Op.in]: leaIdArray
                        },
                        [Op.or]: {
                            reqRequestDate: {[Op.between]: [desdereqRequestDate, hastareqRequestDate],},
                            reqInitialDate: {[Op.between]: [desdereqInitialDate, hastareqInitialDate],},
                            reqPlanFinalDate: {[Op.between]: [desdereqPlanFinalDate, hastareqPlanFinalDate],},
                            reqRealFinalDate: {[Op.between]: [desdereqRealFinalDate, hastareqRealFinalDate],},
                        }

                    },
                    include: [
                        {
                            model: models.client,
                            as: 'client',
                            require: true

                        },
                        {
                            model: models.comercialAreas,
                            as: 'comercialAreas',

                        },
                        {
                            model: models.entityStatus,
                            as: 'entityStatus'
                        },
                        {
                            model: models.requestType,
                            as: 'requestType'
                        },
                        {
                            model: models.technicalArea,
                            as: 'technicalArea'
                        },
                        {
                            model: models.user,
                            as: 'user'
                        }
                    ],
                    order: [
                        [models.client, 'cliName', 'ASC'],
                        ['reqPriority', 'ASC'],

                    ],

                })
                    .then((porfolio) => {
                        if (porfolio) {
                            type = "success";

                            res.status(HttpStatus.OK).json({message, porfolio, type});
                        }
                    }, (err) => {
                        console.dir(err);
                        message = properties.get('message.res.errorInternalServer');
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                        next(err);
                    });
            } else if (coaId !== '0' && estId !== '0' && cliId === '0') {
                models.request.findAll({
                    where: {
                        reqRealFinalDate: {
                            [Op.gt]: dateTime
                        },
                        estId: {
                            [Op.in]: estIdArray
                        },
                        leaId: {
                            [Op.in]: leaIdArray
                        },
                        coaId: {
                            [Op.in]: coaIdArray
                        },[Op.or]: {
                            reqRequestDate: {[Op.between]: [desdereqRequestDate, hastareqRequestDate],},
                            reqInitialDate: {[Op.between]: [desdereqInitialDate, hastareqInitialDate],},
                            reqPlanFinalDate: {[Op.between]: [desdereqPlanFinalDate, hastareqPlanFinalDate],},
                            reqRealFinalDate: {[Op.between]: [desdereqRealFinalDate, hastareqRealFinalDate],},
                        }

                    },
                    include: [
                        {
                            model: models.client,
                            as: 'client',
                            require: true

                        },
                        {
                            model: models.comercialAreas,
                            as: 'comercialAreas',

                        },
                        {
                            model: models.entityStatus,
                            as: 'entityStatus'
                        },
                        {
                            model: models.requestType,
                            as: 'requestType'
                        },
                        {
                            model: models.technicalArea,
                            as: 'technicalArea'
                        },
                        {
                            model: models.user,
                            as: 'user'
                        }
                    ],
                    order: [
                        [models.client, 'cliName', 'ASC'],
                        ['reqPriority', 'ASC'],

                    ],

                })
                    .then((porfolio) => {
                        if (porfolio) {
                            type = "success";

                            res.status(HttpStatus.OK).json({message, porfolio, type});
                        }
                    }, (err) => {
                        console.dir(err);
                        message = properties.get('message.res.errorInternalServer');
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                        next(err);
                    });
            }

        }
    },
    buscarTitulo(req, res, next) {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate());
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;

        let estId = (req.query.estId.length !== 0) ? req.query.estId : "0";
        let reqTitle = (req.query.reqTitle != null) ? req.query.reqTitle : "none";

        let estIdArray = estId.split(",");

        models.request.findAll({
            where: {
                reqRealFinalDate: {
                    [Op.gt]: dateTime
                },
                estId: {
                    [Op.in]: estIdArray
                },
                reqTitle: {
                    [Op.like]: '%' + reqTitle + '%'
                },
            },
            include: [
                {
                    model: models.client,
                    as: 'client',
                    require: true

                },
                {
                    model: models.comercialAreas,
                    as: 'comercialAreas',

                },
                {
                    model: models.entityStatus,
                    as: 'entityStatus'
                },
                {
                    model: models.requestType,
                    as: 'requestType'
                },
                {
                    model: models.technicalArea,
                    as: 'technicalArea'
                },
                {
                    model: models.user,
                    as: 'user'
                }
            ],
            order: [
                [models.client, 'cliName', 'ASC'],
                ['reqPriority', 'ASC'],

            ],

        })
            .then((porfolio) => {
                if (porfolio) {
                    type = "success";

                    res.status(HttpStatus.OK).json({message, porfolio, type});
                }
            }, (err) => {
                console.dir(err);
                message = properties.get('message.res.errorInternalServer');
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                next(err);
            });
    },
    buscarTituloNoPmo(req, res, next) {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate());
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;

        let estId = (req.query.estId.length !== 0) ? req.query.estId : "0";
        let cliId = (req.query.cliId.length !== 0) ? req.query.cliId : "0";
        let reqTitle = (req.query.reqTitle != null) ? req.query.reqTitle : "none";

        let estIdArray = estId.split(",");
        let cliIdArray = cliId.split(",");

        models.request.findAll({
            where: {
                reqRealFinalDate: {
                    [Op.gt]: dateTime
                },
                estId: {
                    [Op.in]: estIdArray
                },
                cliId: {
                    [Op.in]: cliIdArray
                },
                reqTitle: {
                    [Op.like]: '%' + reqTitle + '%'
                },
            },
            include: [
                {
                    model: models.client,
                    as: 'client',
                    require: true

                },
                {
                    model: models.comercialAreas,
                    as: 'comercialAreas',

                },
                {
                    model: models.entityStatus,
                    as: 'entityStatus'
                },
                {
                    model: models.requestType,
                    as: 'requestType'
                },
                {
                    model: models.technicalArea,
                    as: 'technicalArea'
                },
                {
                    model: models.user,
                    as: 'user'
                }
            ],
            order: [
                [models.client, 'cliName', 'ASC'],
                ['reqPriority', 'ASC'],

            ],

        })
            .then((porfolio) => {
                if (porfolio) {
                    type = "success";

                    res.status(HttpStatus.OK).json({message, porfolio, type});
                }
            }, (err) => {
                console.dir(err);
                message = properties.get('message.res.errorInternalServer');
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                next(err);
            });
    },
    buscarTituloNoClient(req, res, next) {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate());
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;

        let estId = (req.query.estId.length !== 0) ? req.query.estId : "0";
        let leaId = (req.query.leaId.length !== 0) ? req.query.leaId : "0";
        let reqTitle = (req.query.reqTitle != null) ? req.query.reqTitle : "none";

        let estIdArray = estId.split(",");
        let leaIdArray = leaId.split(",");

        models.request.findAll({
            where: {
                reqRealFinalDate: {
                    [Op.gt]: dateTime
                },
                estId: {
                    [Op.in]: estIdArray
                },
                leaId: {
                    [Op.in]: leaIdArray
                },
                reqTitle: {
                    [Op.like]: '%' + reqTitle + '%'
                },
            },
            include: [
                {
                    model: models.client,
                    as: 'client',
                    require: true

                },
                {
                    model: models.comercialAreas,
                    as: 'comercialAreas',

                },
                {
                    model: models.entityStatus,
                    as: 'entityStatus'
                },
                {
                    model: models.requestType,
                    as: 'requestType'
                },
                {
                    model: models.technicalArea,
                    as: 'technicalArea'
                },
                {
                    model: models.user,
                    as: 'user'
                }
            ],
            order: [
                [models.client, 'cliName', 'ASC'],
                ['reqPriority', 'ASC'],

            ],

        })
            .then((porfolio) => {
                if (porfolio) {
                    type = "success";

                    res.status(HttpStatus.OK).json({message, porfolio, type});
                }
            }, (err) => {
                console.dir(err);
                message = properties.get('message.res.errorInternalServer');
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                next(err);
            });
    },

    backlog(req, res, next) {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate());
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;


        let cliId = (req.query.cliId != null) ? req.query.cliId : "0";


        let cliIdArray = cliId.split(",");

        switch (cliId) {

            case '0':

                models.request.findAll({
                    where: {
                        reqRealFinalDate: {
                            [Op.gt]: dateTime
                        },
                        estId: {
                            [Op.eq]: 1
                        },
                    },

                    include: [
                        {
                            model: models.client,
                            as: 'client',
                            require: true

                        },
                        {
                            model: models.comercialAreas,
                            as: 'comercialAreas',

                        },
                        {
                            model: models.entityStatus,
                            as: 'entityStatus'
                        },
                        {
                            model: models.requestType,
                            as: 'requestType'
                        },
                        {
                            model: models.technicalArea,
                            as: 'technicalArea'
                        },
                        {
                            model: models.user,
                            as: 'user'
                        }
                    ],
                    order: [
                        [models.client, 'cliName', 'ASC'],
                        ['reqPriority', 'ASC'],

                    ],



                })
                    .then((porfolio) => {
                        if (porfolio) {
                            type = "success";

                            res.status(HttpStatus.OK).json({message, porfolio, type});
                        }
                    }, (err) => {
                        console.dir(err);
                        message = properties.get('message.res.errorInternalServer');
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                        next(err);
                    });


                break;

            default:
                models.request.findAll({
                    where: {
                        reqRealFinalDate: {
                            [Op.gt]: dateTime
                        },
                        estId: {
                            [Op.eq]: 1
                        },
                        cliId: {
                            [Op.in]: cliIdArray
                        },
                    },

                    include: [
                        {
                            model: models.client,
                            as: 'client',
                            require: true

                        },
                        {
                            model: models.comercialAreas,
                            as: 'comercialAreas',

                        },
                        {
                            model: models.entityStatus,
                            as: 'entityStatus'
                        },
                        {
                            model: models.requestType,
                            as: 'requestType'
                        },
                        {
                            model: models.technicalArea,
                            as: 'technicalArea'
                        },
                        {
                            model: models.user,
                            as: 'user'
                        }
                    ],
                    order: [
                        [models.client, 'cliName', 'ASC'],
                        ['reqPriority', 'ASC'],

                    ],



                })
                    .then((porfolio) => {
                        if (porfolio) {
                            type = "success";

                            res.status(HttpStatus.OK).json({message, porfolio, type});
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

    backlogNoClient(req, res, next) {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate());
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;


        let leaId = (req.query.leaId != null) ? req.query.leaId : "0";


        let leaIdArray = leaId.split(",");

        models.request.findAll({
                    where: {
                        reqRealFinalDate: {
                            [Op.gt]: dateTime
                        },
                        estId: {
                            [Op.eq]: 1
                        },
                        leaId: {
                            [Op.in]: leaIdArray
                        },
                    },

                    include: [
                        {
                            model: models.client,
                            as: 'client',
                            require: true

                        },
                        {
                            model: models.comercialAreas,
                            as: 'comercialAreas',

                        },
                        {
                            model: models.entityStatus,
                            as: 'entityStatus'
                        },
                        {
                            model: models.requestType,
                            as: 'requestType'
                        },
                        {
                            model: models.technicalArea,
                            as: 'technicalArea'
                        },
                        {
                            model: models.user,
                            as: 'user'
                        }
                    ],
                    order: [
                        [models.client, 'cliName', 'ASC'],
                        ['reqPriority', 'ASC'],

                    ],



                })
                    .then((porfolio) => {
                        if (porfolio) {
                            type = "success";

                            res.status(HttpStatus.OK).json({message, porfolio, type});
                        }
                    }, (err) => {
                        console.dir(err);
                        message = properties.get('message.res.errorInternalServer');
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                        next(err);
                    });

    },

    noBacklog(req, res, next) {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate());
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;


        let cliId = (req.query.cliId != []) ? req.query.cliId : "0";
        console.log(req.query.cliId.length)


        let cliIdArray = cliId.split(",");

        switch (cliId) {

            case '0':

                models.request.findAll({
                    where: {
                        reqRealFinalDate: {
                            [Op.gt]: dateTime
                        },
                        estId: {
                            [Op.notIn]: [1, 5]
                        },
                    },

                    include: [
                        {
                            model: models.client,
                            as: 'client',
                            require: true

                        },
                        {
                            model: models.comercialAreas,
                            as: 'comercialAreas',

                        },
                        {
                            model: models.entityStatus,
                            as: 'entityStatus'
                        },
                        {
                            model: models.requestType,
                            as: 'requestType'
                        },
                        {
                            model: models.technicalArea,
                            as: 'technicalArea'
                        },
                        {
                            model: models.user,
                            as: 'user'
                        }
                    ],
                    order: [
                        [models.client, 'cliName', 'ASC'],
                        ['reqPriority', 'ASC'],

                    ],



                })
                    .then((porfolio) => {
                        if (porfolio) {
                            type = "success";

                            res.status(HttpStatus.OK).json(porfolio);
                        }
                    }, (err) => {
                        console.dir(err);
                        message = properties.get('message.res.errorInternalServer');
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                        next(err);
                    });


                break;

            default:
                models.request.findAll({
                    where: {
                        reqRealFinalDate: {
                            [Op.gt]: dateTime
                        },
                        estId: {
                            [Op.notIn]: [1, 5]
                        },
                        cliId: {
                            [Op.in]: cliIdArray
                        },
                    },

                    include: [
                        {
                            model: models.client,
                            as: 'client',
                            require: true

                        },
                        {
                            model: models.comercialAreas,
                            as: 'comercialAreas',

                        },
                        {
                            model: models.entityStatus,
                            as: 'entityStatus'
                        },
                        {
                            model: models.requestType,
                            as: 'requestType'
                        },
                        {
                            model: models.technicalArea,
                            as: 'technicalArea'
                        },
                        {
                            model: models.user,
                            as: 'user'
                        }
                    ],
                    order: [
                        [models.client, 'cliName', 'ASC'],
                        ['reqPriority', 'ASC'],

                    ],



                })
                    .then((porfolio) => {
                        if (porfolio) {
                            type = "success";

                            res.status(HttpStatus.OK).json(porfolio);
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

    noBacklogNoClient(req, res, next) {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate());
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;


        let leaId = (req.query.leaId != null) ? req.query.leaId : "0";


        let leaIdArray = leaId.split(",");

        models.request.findAll({
                    where: {
                        reqRealFinalDate: {
                            [Op.gt]: dateTime
                        },
                        estId: {
                            [Op.notIn]: [1, 5]
                        },
                        leaId: {
                            [Op.in]: leaIdArray
                        },
                    },

                    include: [
                        {
                            model: models.client,
                            as: 'client',
                            require: true

                        },
                        {
                            model: models.comercialAreas,
                            as: 'comercialAreas',

                        },
                        {
                            model: models.entityStatus,
                            as: 'entityStatus'
                        },
                        {
                            model: models.requestType,
                            as: 'requestType'
                        },
                        {
                            model: models.technicalArea,
                            as: 'technicalArea'
                        },
                        {
                            model: models.user,
                            as: 'user'
                        }
                    ],
                    order: [
                        [models.client, 'cliName', 'ASC'],
                        ['reqPriority', 'ASC'],

                    ],



                })
                    .then((porfolio) => {
                        if (porfolio) {
                            type = "success";

                            res.status(HttpStatus.OK).json({message, porfolio, type});
                        }
                    }, (err) => {
                        console.dir(err);
                        message = properties.get('message.res.errorInternalServer');
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message});
                        next(err);
                    });

    },
};
