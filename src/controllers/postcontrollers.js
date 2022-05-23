const { createPost } = require('../Services/postServices');
const { decodedToken } = require('../middleware/authToken');
const { findUserpost, getPostandUserandCategories } = require('../Services/postServices');

const createPosts = async (req, res) => {
    try {
    const { title, content, categoryIds } = req.body;
    const token = req.headers.authorization;
    const tokenDecode = await decodedToken(token);
    const iduser = await findUserpost(tokenDecode.data);
    const post = await createPost(title, content, categoryIds, iduser.id);
    return res.status(201).json(post);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getPost = async (req, res) => {
    try {
    const post = await getPostandUserandCategories();
    return res.status(200).json(post);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createPosts,
    getPost,
};