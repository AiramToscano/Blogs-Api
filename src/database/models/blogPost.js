const BlogPost = (sequelize, DataTypes) => {
	const BlogPost = sequelize.define('BlogPost', {
            id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
		title: DataTypes.STRING,
        content: DataTypes.STRING,
		userId: DataTypes.INTEGER,
        updated: DataTypes.DATE,
        published: DataTypes.DATE,
	}, 
    { timestamps: false },
    );

	BlogPost.associate = (models) => {
		BlogPost.belongsTo(models.User, { as: 'user', foreignKey: 'userid' });
	};

	return BlogPost;
};

module.exports = BlogPost;