const jwt = require("jsonwebtoken");
const createError = require("http-errors");
//const client = require("./init_redis");

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: '60m',
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
  signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.REFRESH_TOKEN_SECRET;
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
        //client.execute(['EXPIRE', `Room:`, 3600]);
     /*    client.set(userId, token, "EX", 7 * 24 * 60 * 60, (err, reply) => {
          if (err) {
            console.log(err.message);
            reject(createError.InternalServerError());
            return;
          }
          resolve(token);
        }); */
        resolve(token);
      });
    });
  },
  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, payload) => {
          if (err) {
            //res.json({ status: 401, msg: "error: your refresh token is not valid" });
            return reject(
              createError.Unauthorized("401: your refresh token is not valid")
            );
          } else {
            const userId = payload.aud;
            /*   client.GET(userId, (err, result) => {
                if (err) {console.log(err)
                reject(createError.InternalServerError())
                return
                }
                if(refreshToken === result) return resolve(userId)
                reject(createError.Unauthorized())
            }) */
            resolve(userId);
          }
        }
      );
    });
  },
};
