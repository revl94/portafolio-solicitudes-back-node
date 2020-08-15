/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const entityStatus = sequelize.define('entityStatus', {
    estId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'est_id'
    },
    estName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'est_name'
    },
    estValidTo: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: '9999-12-31 00:00:00',
      field: 'est_valid_to'
    },
    estUserLastUpdated: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'est_user_last_updated'
    },
    estDateLastUpdated: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'est_date_last_updated'
    }
  }, {
    tableName: 'entity_status',
    timestamps: false
  });

  entityStatus.associate = function (models) {
    models.entityStatus.belongsTo(models.request, {
      as: 'request',
      sourceKey: 'estId',
      foreignKey: 'estId'
    })
  };


  return entityStatus;
};
