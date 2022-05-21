const { createCategory } = require('../Services/categoryServices');

const createCategorys = async (req, res) => {
    try {
    const { name } = req.body;
    const createcategory = await createCategory(name);
    return res.status(201).json(createcategory);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createCategorys,
};
