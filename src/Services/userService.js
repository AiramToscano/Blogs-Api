const { User } = require('../database/models');
const { createJWT } = require('../utils/createJWT');

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
    const findall = await User.findAll(
{
attributes: { exclude: ['password'] },
},
);
 return findall;
};

module.exports = {
    findEmail,
    createUser,
    findAllUsers,
};
