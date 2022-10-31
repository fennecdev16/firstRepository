const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: '1d',
        audience: userId,
      };

      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err);
          reject(createError.InternalServerError());
          return;
        }
        resolve(token);
      });
    });
  },
   
};
