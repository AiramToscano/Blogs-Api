const { createUser, findAllUsers, userById } = require('../Services/userService');

const createUsers = async (req, res) => {
    try {
        const { displayName, email, password, image } = req.body;
        const createtoken = await createUser(displayName, email, password, image);
        return res.status(201).json({ token: createtoken });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getUsers = async (_req, res) => {
    try {
    const alluser = await findAllUsers();
    return res.status(200).json(alluser);
    } catch (err) {
        return res.status(err.error).json({ message: err.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
    const user = await userById(id);
    return res.status(200).json(user);
    } catch (err) {
        return res.status(err.error).json({ message: err.message });
    }
};
module.exports = {
    createUsers,
    getUsers,
    getUserById,
};