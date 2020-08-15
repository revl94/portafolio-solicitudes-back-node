/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('leaders', {
    leaId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ltyId: {
      type: DataTypes.INTEGER(1),
      allowNull: false

    },
    leaName: {
      type: DataTypes.STRING(50),
      allowNull: false

    },
    leaValidTo: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: '9999-12-31 00:00:00'
    },
    leaUserLastUpdated: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    leaDateLastUpdated: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'leaders'
  });
  
};
