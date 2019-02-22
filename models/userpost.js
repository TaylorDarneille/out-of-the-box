'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserPost = sequelize.define('UserPost', {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  UserPost.associate = function(models) {
    // associations can be defined here
  };
  return UserPost;
};