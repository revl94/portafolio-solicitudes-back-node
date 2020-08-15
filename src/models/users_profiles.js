/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users_profiles', {
    upo_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    usr_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'app_users',
        key: 'usr_id'
      }
    },
    pro_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'app_profiles',
        key: 'pro_id'
      }
    },
    upo_user_last_updated: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    upo_date_last_updated: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'users_profiles'
  });
};
