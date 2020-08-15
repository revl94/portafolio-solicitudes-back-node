/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const requestType = sequelize.define('requestType', {
    typId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'typ_id'
    },
    typName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'typ_name'
    },
    typValidTo: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: '9999-12-31 00:00:00',
      field: 'typ_valid_to'
    },
    typUserLastUpdated: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'typ_user_last_updated'
    },
    typDateLastUpdated: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'typ_date_last_updated'
    }
  }, {
    tableName: 'request_type',
    timestamps: false
  });

  requestType.associate = function (models) {
    models.requestType.belongsTo(models.request, {
      as: 'request',
      sourceKey: 'typId',
      foreignKey: 'typId'
    })
  }


  return requestType;
};

