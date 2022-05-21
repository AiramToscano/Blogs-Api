const { Category } = require('../database/models');

const createCategory = async (categoryname) => {
    const createcategory = await Category.create({ 
        name: categoryname,
    });

 return createcategory;
};

module.exports = {
    createCategory,
};
