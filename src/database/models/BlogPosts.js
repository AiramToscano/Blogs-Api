const BlogPost = (sequelize, DataTypes) => {
	const BlogPost = sequelize.define('BlogPost', {
            id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
		title: DataTypes.STRING,
        content: DataTypes.STRING,
		userid: DataTypes.INTEGER,
        updated: DataTypes.DATE,
        publisher: DataTypes.DATE,
	});

	BlogPost.associate = (models) => {
		BlogPost.belongsTo(models.User, { as: 'User', foreignKey: 'userid' });
	};

	return BlogPost;
};

module.exports = BlogPost;