'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      autoincrement: false,
      defaultValue: DataTypes.UUIDV4
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    maps_api_key: DataTypes.TEXT
  }, {});
  User.associate = function(models) {
    User.belongsTo(models.Organization, { foreignKey: 'UserOrganizationId' });
    User.hasMany(models.Trail, { foreignKey: 'id', target: 'organization_id' });
  };
  return User;
};