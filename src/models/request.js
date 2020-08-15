/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const request = sequelize.define('request', {
    reqId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'req_id'
    },
    cliId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'cli_id'
    },
    coaId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'coa_id'
    },
    leaId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'lea_id'
    },
    typId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'typ_id'
    },
    estId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'est_id'
    },
    teaId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'tea_id'
    },
    reqTitle: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'req_title'

    },
    reqDescription: {
      type: DataTypes.STRING(1024),
      allowNull: false,
      field: 'req_description'
    },
    reqPriority: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'req_priority'
    },
    reqRequestDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'req_request_date'

    },
    reqInitialDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'req_initial_date'
    },
    reqPlanFinalDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'req_plan_final_date'
    },
    reqRealFinalDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'req_real_final_date'
    },
    reqUpdateStatusDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'req_update_status_date'
    },
    reqAdvancePtge: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'req_advance_ptge'
    },
    reqDeviationsPtge: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'req_deviations_ptge'
    },
    reqClientCompletedDeliverables: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      field: 'req_client_completed_deliverables'
    },
    reqClientPendingActivities: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      field: 'req_client_pending_activities'
    },
    reqClientComments: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      field: 'req_client_comments'
    },
    reqIntelixCompletedDeliverables: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      field: 'req_intelix_completed_deliverables'
    },
    reqIntelixPendingActivities: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      field: 'req_intelix_pending_activities'
    },
    reqIntelixComments: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      field: 'req_intelix_comments'
    },
    reqSendToComitee: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'req_send_to_comitee'
    },
    reqComiteeAgenda: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      field: 'req_comitee_agenda'
    }
  }, {
    tableName: 'request',
    timestamps: false
  })

  request.associate = function (models) {
    request.hasMany(models.comercialAreas, {

      name: 'comercialAreas',
      sourceKey: 'coaId',
      foreignKey: 'coaId'

    });

    request.hasMany(models.requestType, {
      as: 'requestType',
      sourceKey: 'typId',
      foreignKey: 'typId'
    });

    request.hasMany(models.technicalArea, {
      as: 'technicalArea',
      sourceKey: 'teaId',
      foreignKey: 'teaId'
    });

    request.hasMany(models.entityStatus, {
      as: 'entityStatus',
      sourceKey: 'estId',
      foreignKey: 'estId'
    })

    request.hasMany(models.client, {
      as: 'client',
      sourceKey: 'cliId',
      foreignKey: 'cliId'
    });    

    request.hasMany(models.user, {
      as: 'user',
      sourceKey: 'leaId',
      foreignKey: 'userId'
    });   
  }

  return request;
}
