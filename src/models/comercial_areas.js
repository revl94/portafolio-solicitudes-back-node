/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const comercialAreas = sequelize.define('comercialAreas', {
    coaId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'coa_id'

    },
    coaName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'coa_name'
    },
    coaValidTo: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: '9999-12-31 00:00:00',
      field: 'coa_valid_to'
    },
    coaUserLastUpdated: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'coa_user_last_updated'
    },
    coaDateLastUpdated: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'coa_date_last_updated'
    }
  }, {
    tableName: 'comercial_areas',
    timestamps: false //Para que no cree los campos por defecto
  });

  comercialAreas.associate = function (models) {
    models.comercialAreas.belongsTo(models.request, {
      as: 'request',
      sourceKey: 'coaId',
      foreignKey: 'coaId'
    })
  }


  return comercialAreas;
};
