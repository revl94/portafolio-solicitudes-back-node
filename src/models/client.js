/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const client = sequelize.define('client', {
    cliId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'cli_id'
    },
    cliName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'cli_name'
    },
    cliContactName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'cli_contact_name'
    },
    cliContactEmail: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'cli_contact_email'
    },
    cliHolisticManagerName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'cli_holistic_manager_name'
    },
    cliHolisticManagerEmail: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'cli_holistic_manager_email'
    },
    cliValidTo: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: '9999-12-31 00:00:00',
      field: 'cli_valid_to'
    },
    cliUserLastUpdated: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'cli_user_last_updated'
    },
    cliDateLastUpdated: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'cli_date_last_updated'
    }
  }, {
    tableName: 'client',
    timestamps: false
  });
  
  client.associate = function (models) {
    models.client.belongsTo(models.request, {
      as: 'request',
      sourceKey: 'cliId',
      foreignKey: 'cliId'
    });
    models.client.belongsTo(models.userClient, {
      as: 'userClient',
      sourceKey: 'cliId',
      foreignKey: 'cliId'
    });
  }

  return client;
};
