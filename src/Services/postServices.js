const { BlogPost, PostCategory, Category, User } = require('../database/models');

const erroUser = {
    error: 401,
    message: 'Unauthorized user',
};

const erropost = {
    error: 404,
    message: 'Post does not exist',
};

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

const getPostandUserandCategories = async () => {
    const findpost = await BlogPost.findAll(
        {
            attributes: { exclude: ['userid'] },
include: [{
model: User,
as: 'user',
attributes: { exclude: ['password'] },
},
{
model: Category,
as: 'categories',
through: { attributes: [] },
}],
        },
    );
    return findpost;
};

const getPostandUserandCategoriesID = async (id) => {
    const findpost = await BlogPost.findByPk(
        id,
        {
            attributes: { exclude: ['userid'] },
include: [{
model: User,
as: 'user',
attributes: { exclude: ['password'] },
},
{
model: Category,
as: 'categories',
through: { attributes: [] },
}],
        },
    );
    return findpost;
};

const findUpadterpost = async (postTitle, postContent, userId, postid) => {
 const verifyuserid = await getPostandUserandCategoriesID(postid);
 if (verifyuserid === null) throw erropost;
 const userid = verifyuserid.dataValues.userId;
 if (userid === userId) {
        const finbyid = await BlogPost.findByPk(postid);
        finbyid.title = postTitle;
        finbyid.content = postContent;
        await finbyid.save();
      return true;    
 }
 throw erroUser;
};

const deletePost = async (idpost, iduser) => {
    const verifyuserid = await getPostandUserandCategoriesID(idpost);
    if (verifyuserid === null) throw erropost;
    const userid = verifyuserid.dataValues.userId;
    if (userid === iduser) {
       const finbyid = await BlogPost.findByPk(idpost);
       await finbyid.destroy(); 
    return true;
 }
    throw erroUser;
};

module.exports = {
    verifyCategoryId,
    createPost,
    findUserpost,
    getPostandUserandCategories,
    getPostandUserandCategoriesID,
    findUpadterpost,
    deletePost,
};
