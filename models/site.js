'use strict';
module.exports = (sequelize, DataTypes) => {
  const site = sequelize.define('site', {
    name: DataTypes.STRING,
    abbreviation: DataTypes.STRING,
    url: DataTypes.STRING
  }, {});
  site.associate = function(models) {
    // associations can be defined here
    models.site.hasMany(models.post);
  };
  return site;
};