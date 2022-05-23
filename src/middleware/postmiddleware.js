const { verifyCategoryId } = require('../Services/postServices');

const validpostFields = (req, res, next) => {
    const { title, content, categoryIds } = req.body;
    if (title === '' || content === '' || categoryIds === []) {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }
    return next();
   };

const validpostFieldsUpdate = (req, res, next) => {
    const { title, content } = req.body;
    if (title === '' || content === '') {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }
    return next();
   };

const validCategoryIds = async (req, res, next) => {
    try {
    const { categoryIds } = req.body;
   const verifyIds = await verifyCategoryId(categoryIds);
   if (!verifyIds) return next();
   return res.status(400).json({ message: '"categoryIds" not found' });
    } catch (err) {
    return res.status(500).json({ message: err.message });
    }
};
   
   module.exports = {
    validpostFields,
    validCategoryIds,
    validpostFieldsUpdate,
   };