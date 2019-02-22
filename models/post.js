'use strict';
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    subject: DataTypes.STRING,
    content: DataTypes.TEXT,
    authorId: DataTypes.INTEGER,
    siteId: DataTypes.INTEGER
  }, {});
  post.associate = function(models) {
    // associations can be defined here
    models.post.hasMany(models.comment);
    models.post.belongsToMany(models.user, {through: 'UserPost'});
  };
  return post;
};