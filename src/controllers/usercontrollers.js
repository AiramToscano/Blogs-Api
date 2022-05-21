const { createUser } = require('../Services/userService');

const getUsers = async (req, res) => {
    try {
        const { displayName, email, password, image } = req.body;
        const createtoken = await createUser(displayName, email, password, image);
        
        // const tokenValid = await findUsers(email, password);
        return res.status(201).json({ token: createtoken });
    } catch (err) {
        return res.status(err.error).json({ message: err.message });
    }
};

module.exports = {
    getUsers,
};