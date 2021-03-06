'use strict';
module.exports = (sequelize, DataTypes) => {
	const comment = sequelize.define(
		'comment',
		{
			content: DataTypes.TEXT,
			userId: DataTypes.INTEGER,
			postId: DataTypes.INTEGER,
		},
		{}
	);
	comment.associate = function(models) {
		// associations can be defined here
		models.comment.belongsTo(models.user);
		models.comment.belongsTo(models.post);
	};
	return comment;
};
