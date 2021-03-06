const User = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		displayName: DataTypes.STRING,
		password: DataTypes.STRING,
		email: DataTypes.STRING,
        image: DataTypes.STRING
	}, {
		timestamps: false,
	}
	);

	User.associate = (models) => {
		User.hasMany(models.BlogPost, { as: 'BlogPost', foreignKey: 'userid' });
	};

	return User;
};

module.exports = User;