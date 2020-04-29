'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trail = sequelize.define('Trail', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      autoincrement: false,
      defaultValue: DataTypes.UUIDV4
    },
    identifier: {
      type: DataTypes.STRING,
      allowNull: false
    },
    trail: DataTypes.JSON
  }, {});
  Trail.associate = function(models) {
    // associations can be defined here
    Trail.belongsTo(models.Organization, { foreignKey: 'organization_id' });
    Trail.belongsTo(models.User, { foreignKey: 'user_id' });
  };
  return Trail;
};