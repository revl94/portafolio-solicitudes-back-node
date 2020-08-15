/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const userClient = sequelize.define('userClient', {
    ucId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'usr_id'
    },
    cliId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'client_id'
    },
    ucValidTo: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: '9999-12-31 00:00:00',
      field: 'valid_to'
    },
    ucUserLastUpdated: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'user_last_updated'
    },
    ucDateLastUpdated: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'date_last_updated'
    }
  }, {
    tableName: 'users_clients',
    timestamps: false
  });

  userClient.associate = function (models) {
    userClient.hasMany(models.user, {
      name: 'user',
      sourceKey: 'userId',
      foreignKey: 'userId'
    });
    userClient.hasMany(models.client, {
      as: 'client',
      sourceKey: 'cliId',
      foreignKey: 'cliId'
    }); 
  }

  return userClient;

}; 
