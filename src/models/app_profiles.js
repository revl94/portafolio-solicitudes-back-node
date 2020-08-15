/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('app_profiles', {
    pro_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    pro_name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    pro_valid_to: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '9999-12-31 00:00:00'
    },
    pro_user_last_updated: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    pro_date_last_updated: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'app_profiles'
  });
};
