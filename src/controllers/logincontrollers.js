const { findUsers } = require('../Services/loginService');

const getUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const tokenValid = await findUsers(email, password);
        return res.status(200).json({ token: tokenValid });
    } catch (err) {
        return res.status(err.error).json({ message: err.message });
    }
};

module.exports = {
    getUser,
};