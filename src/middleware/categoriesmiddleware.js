const verifyNameCategorie = (req, res, next) => {
    const { name } = req.body;
    console.log(name);
    if (!name || name.length < 1) {
        return res.status(400)
        .json({ message: '"name" is required' });
    }
    return next();
};

module.exports = {
    verifyNameCategorie,
};
