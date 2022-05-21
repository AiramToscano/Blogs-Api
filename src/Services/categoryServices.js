const { Category } = require('../database/models');

const createCategory = async (categoryname) => {
    const createcategory = await Category.create({ 
        name: categoryname,
    });

 return createcategory;
};

const findAllcategory = async () => {
    const findcategory = await Category.findAll();
 return findcategory;
};

module.exports = {
    createCategory,
    findAllcategory,
};
