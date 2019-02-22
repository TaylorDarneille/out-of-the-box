'use strict';
module.exports = (sequelize, DataTypes) => {
  const TopicPost = sequelize.define('TopicPost', {
    postId: DataTypes.INTEGER,
    topicId: DataTypes.INTEGER
  }, {});
  TopicPost.associate = function(models) {
    // associations can be defined here
  };
  return TopicPost;
};