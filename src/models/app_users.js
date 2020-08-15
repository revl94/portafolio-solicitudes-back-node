/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const user = sequelize.define('user', {
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'usr_id'
    },
    userName: {
      type: DataTypes.STRING(200),
      allowNull: false, 
      field: 'usr_name'
    },
    userFullName: {
      type: DataTypes.STRING(200),
      allowNull: false, 
      field: 'usr_fullName'
    },
    userContactEmail: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'usr_contact_email'
    },
    userValidTo: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: '9999-12-31 00:00:00',
      field: 'usr_valid_to'
    },
    userUserLastUpdated: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'usr_user_last_updated'
    },
    userDateLastUpdated: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'usr_date_last_updated'
    }
  }, {
    tableName: 'app_users',
    timestamps: false
  });

  user.associate = function (models) {
    models.user.belongsTo(models.request, {
      as: 'request',
      sourceKey: 'leaId',
      foreignKey: 'userId'
    });
    models.user.belongsTo(models.userClient, {
      as: 'userClient',
      sourceKey: 'userId',
      foreignKey: 'userId'
    })
  }

  return user;

}; 
