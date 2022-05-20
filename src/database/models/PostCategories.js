module.exports = (sequelize, _DataTypes) => {
    const postCategorie = sequelize.define('PostCategorie',
      {},
      { timestamps: false },
    );
  
    postCategorie.associate = (models) => {
      models.BlogPost.belongsToMany(models.Categorie, {
        as: 'Categorie',
        through: postCategorie,
        foreignKey: 'postId',
        otherKey: 'categoryid',
      });
      models.Categorie.belongsToMany(models.BlogPost, {
        as: 'BlogPost',
        through: postCategorie,
        foreignKey: 'categoryId',
        otherKey: 'postid',
      });
    };
  
    return postCategorie;
  };