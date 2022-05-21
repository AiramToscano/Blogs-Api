const Categorie = (sequelize, DataTypes) => {
	const Categorie = sequelize.define('Category', {
		id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
		name: DataTypes.STRING,
	}, {
		timestamps: false,
	}
	);

	return Categorie;
};

module.exports = Categorie;