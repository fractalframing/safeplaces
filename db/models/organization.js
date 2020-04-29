'use strict';
module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define('Organization', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      autoincrement: false,
      defaultValue: DataTypes.UUIDV4
    },
    website: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  Organization.associate = function(models) {
    // associations can be defined here
    Organization.hasMany(models.Path, { foreignKey: 'id', target: 'authority_id'});
    Organization.hasMany(models.User, { foreignKey: 'id', target: 'UserOrganizationId' });
    Organization.hasMany(models.Trail, { foreignKey: 'id', target: 'organization_id' });
  };
  return Organization;
};