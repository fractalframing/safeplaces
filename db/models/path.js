'use strict';
module.exports = (sequelize, DataTypes) => {
  const Path = sequelize.define('Path', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      autoincrement: false,
      defaultValue: DataTypes.UUIDV4
    },
    concern_points: DataTypes.JSON,
    authority_id: DataTypes.INTEGER,
    publish_date_utc: {
      type: DataTypes.INTEGER(20).UNSIGNED,
      allowNull: false
    }
  }, {});
  Path.associate = function(models) {
    // associations can be defined here
    Path.belongsTo(models.Organization, { foreignKey: 'authority_id', target: 'id' });
  };
  return Path;
};