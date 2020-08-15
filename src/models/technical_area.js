/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const technicalArea = sequelize.define('technicalArea', {
    teaId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'tea_id'
    },
    teaName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'tea_name'
    },
    teaValidTo: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: '9999-12-31 00:00:00',
      field: 'tea_valid_to'
    },
    teaUserLastUpdated: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'tea_user_last_updated'
    },
    teaDateLastUpdated: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'tea_date_last_updated'
    }
  }, {
    tableName: 'technical_area',
    timestamps: false
  });

   technicalArea.associate = function (models) {
    models.technicalArea.belongsTo(models.request, {
      as: 'request',
      sourceKey: 'teaId',
      foreignKey: 'teaId'
    })
  }

  return technicalArea;
};
