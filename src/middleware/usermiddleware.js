const joi = require('joi');
const { findEmail } = require('../Services/userService');

const HTTP_BAD_REQUEST = 400;

    const verifydisplayName = (req, res, next) => {
        const { displayName } = req.body;
        if (displayName.length < 8) {
            return res.status(HTTP_BAD_REQUEST)
            .json({ message: '"displayName" length must be at least 8 characters long' });
        }
        return next();
    };
    
    const verifyEmail = async (req, res, next) => {
        const { email } = req.body;
        const EMAILSCHEMA = joi.object({
          emailverifc: joi.string()
          .required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }) });
       const teste = EMAILSCHEMA.validate({ emailverifc: email });
       const { error } = teste;
        if (error) {
          return res.status(HTTP_BAD_REQUEST)
          .json({ message: '"email" must be a valid email' });
        }
       return next();
      };
      
      const verifyPassword = (req, res, next) => {
        const { password } = req.body;
        if (password.length < 6) {
           return res.status(400)
           .json({ message: '"password" length must be at least 6 characters long' });
        }
        return next();
      };

      const verifyEmailExist = async (req, res, next) => {
        const { email } = req.body;
        const verifyemail = await findEmail(email);
        if (verifyemail) {
       return next();
        }
    return res.status(409).json({ message: 'User already registered' });
    };
module.exports = {
    verifydisplayName,
    verifyEmail,
    verifyPassword,
    verifyEmailExist,
};
