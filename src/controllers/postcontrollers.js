const { createPost } = require('../Services/postServices');
const { decodedToken } = require('../middleware/authToken');
const { findUserpost,
getPostandUserandCategories, 
getPostandUserandCategoriesID, findUpadterpost, deletePost } = require('../Services/postServices');

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

const getPostId = async (req, res) => {
    try {
        const { id } = req.params;
    const postId = await getPostandUserandCategoriesID(id);
    if (!postId) {
        return res.status(404).json({ message: 'Post does not exist' });
    }
    return res.status(200).json(postId);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const updatePosts = async (req, res) => {
    try {
    const { title, content } = req.body;
    const { id } = req.params;
    const token = req.headers.authorization;
    const tokenDecode = await decodedToken(token);
    const iduser = await findUserpost(tokenDecode.data);
    await findUpadterpost(title, content, iduser.id, id);
    const post = await getPostandUserandCategoriesID(id);
    return res.status(200).json(post);
    } catch (err) {
        return res.status(err.error).json({ message: err.message });
    }
};

const deletePosts = async (req, res) => {
    try {
    const { id } = req.params;
    const token = req.headers.authorization;
    const tokenDecode = await decodedToken(token);
    const iduser = await findUserpost(tokenDecode.data);
    await deletePost(id, iduser.id);
    return res.status(204).end();
    } catch (err) {
        return res.status(err.error).json({ message: err.message });
    }
};

module.exports = {
    createPosts,
    getPost,
    getPostId,
    updatePosts,
    deletePosts,
};