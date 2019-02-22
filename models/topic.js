'use strict';
module.exports = (sequelize, DataTypes) => {
  const topic = sequelize.define('topic', {
    name: DataTypes.STRING
  }, {});
  topic.associate = function(models) {
    // associations can be defined here
    models.topic.belongsToMany(models.post, {through: 'TopicPost'})
  };
  return topic;
};