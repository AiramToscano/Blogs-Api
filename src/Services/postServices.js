const { BlogPost, PostCategory, Category, User } = require('../database/models');

const verifyCategoryId = async (data) => {
    const findId = await Promise.all(data.map(async (idUser) => {
    const findUser = await Category.findOne({ where: { id: idUser } });
    return findUser;
    }));
   const verifyId = findId.some((e) => e === null);
    return verifyId;
};

const createPost = async (postTitle, PostContent, dataId, idUser) => {
    const createPosts = await BlogPost.create({ 
        title: postTitle,
        content: PostContent,
        userId: idUser,
        updated: new Date(),
        published: new Date(),
    });
    await dataId.forEach(async (id) => {
        await PostCategory.create({
        postId: createPosts.dataValues.id,
        categoryId: id,
        });
    });
    return createPosts;
};

const findUserpost = async (emailLogin) => {
    const finduser = await User.findOne({ where: { email: emailLogin } });
    return finduser.dataValues;
  };

module.exports = {
    verifyCategoryId,
    createPost,
    findUserpost,
};
