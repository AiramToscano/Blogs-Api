const { createCategory, findAllcategory } = require('../Services/categoryServices');

const createCategorys = async (req, res) => {
    try {
    const { name } = req.body;
    const createcategory = await createCategory(name);
    return res.status(201).json(createcategory);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getCategorys = async (req, res) => {
    try {
    const getcategory = await findAllcategory();
    return res.status(200).json(getcategory);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createCategorys,
    getCategorys,
};
