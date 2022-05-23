const { User } = require('../database/models');
const { createJWT } = require('../utils/createJWT');

const erroUser = {
    error: 404,
    message: 'User does not exist',
};

const findEmail = async (emailLogin) => {
    const findUser = await User.findOne({ where: { email: emailLogin } });
    if (!findUser) {
     return true;
    }
   return false;
  };

const createUser = async (displayname, useremail, userpassword, userimage) => {
    await User.create({ 
        displayName: displayname,
        email: useremail,
        password: userpassword,
        image: userimage,
    });
    const token = createJWT(useremail);
 return token;
};

const findAllUsers = async () => {
    const finduser = await User.findAll(
{
attributes: { exclude: ['password'] },
},
);
 return finduser;
};

const userById = async (id) => {
const user = await User.findByPk(id,
{
attributes: { exclude: ['password'] },
});
if (!user) throw erroUser;
return user;
};

const deleteUser = async (iduserToken, iduser) => {
    if (Number(iduserToken) === Number(iduser)) {
        const finbyid = await User.findByPk(iduserToken);
        finbyid.destroy(); 
    return true;
    }
};

module.exports = {
    findEmail,
    createUser,
    findAllUsers,
    userById,
    deleteUser,
};
