const { createUser, findAllUsers,
     userById, deleteUser } = require('../Services/userService');
const { decodedToken } = require('../middleware/authToken');
const { findUserpost } = require('../Services/postServices');

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

const deleteusers = async (req, res) => {
    try {
    const { id } = req.params;
    // console.log(id);
    const token = req.headers.authorization;
    const tokenDecode = await decodedToken(token);
    const iduser = await findUserpost(tokenDecode.data);
    await deleteUser(iduser.id, id);
    return res.status(204).end();
    } catch (err) {
        return res.status(err.error).json({ message: err.message });
    }
};
module.exports = {
    createUsers,
    getUsers,
    getUserById,
    deleteusers,
};