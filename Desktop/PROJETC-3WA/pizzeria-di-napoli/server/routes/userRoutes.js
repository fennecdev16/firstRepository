const withAuth = require("../middleware/withAuth");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../helpers/jwt_helper");
const { isValidPassword } = require("../helpers/bcrypt_helper");
/* const client = require("../helpers/init_redis"); */
const createError = require("http-errors");

module.exports = (app, db) => {
  const userModel = require("../models/UserModel")(db);

  //route d'enregistrement d'un utilisateur
  app.post("/api/v1/user/save", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw createError.BadRequest();

      let verifemail = await userModel.getUserByEmail(email);

      if (verifemail.status !== 401) {
        let user = await userModel.saveOneUser(req);
        if (user.code) {
          res.json({ status: 500, error: user });
        } else {
          res.json({ status: 200, results: user });
        }
      } else {
        res.json({
          status: 403,
          error: "Impossible d'enregistrer sur cet email",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  //route de connexion d'un utilisateur (c'est ici qu'on va créer le token et l'envoyer vers le front)
  app.post("/api/v1/user/login", async (req, res, next) => {
    try {
      if (!req.body.email || !req.body.password) {
        res.json({ status: 401, msg: "email and password required" });
      }
      //on check si il existe un utilisateur dans la bdd avec un mail correspondant
      let user = await userModel.getUserByEmail(req.body.email);
      if (user.code) {
        res.json({ status: 500, msg: "error vérification email.", err: user });
      } else if (user.length === 0) {
        res.json({ status: 404, msg: "That email not exist" });
      } else {
        //on compare les password avec bcrypt
        const isMatch = await isValidPassword(
          req.body.password,
          user[0].password
        );

        if (!isMatch) {
          res.json({ status: 401, error: "Username/password not valid" });
        } else {
          const accessToken = await signAccessToken(user[0].key_id);
          const refreshToken = await signRefreshToken(user[0].key_id);

          //Create secure cookie with refresh token

          /* res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          }); */
          //fin cookie
          const validUntil = new Date();
          validUntil.setDate(validUntil.getDate() + 7);
          const saveRefreshT = await userModel.saveRefreshToken(
            user[0].key_id,
            refreshToken,
            validUntil
          );
          if (saveRefreshT.code) {
            res.json({
              status: 500,
              msg: `error ${saveRefreshT}`,
              err: saveRefreshT,
            });
          }
          const {
            password,
            connexionTimestamp,
            creationTimestamp,
            role,
            ...other
          } = user[0];
          res.json({
            status: 200,
            accessToken: accessToken,
            //refreshToken: refreshToken,
            ...other,
            isAdmin: user[0].role === "admin",
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  });

  //route de modification des utilisateurs
  app.put(
    "/api/v1/user/update/profile/:id",
    withAuth,
    async (req, res, next) => {
      let userId = req.params.id;

      let user = await userModel.updateUser(req, userId);

      if (user.code) {
        res.json({ status: 500, msg: "error with update user", err: user });
      } else if (user.affectedRows === 0) {
        res.json({ status: 404, msg: "user not exist" });
      } else {
        //mon profil est modifié je renvoi les infos de profil mis à jour vers le front
        let updatedUser = await userModel.getOneUser(userId);
        if (updatedUser.code) {
          res.json({
            status: 500,
            msg: "error getting updated user",
            err: updatedUser,
          });
        } else {
          /* const accessToken = await signAccessToken(userId);
          const refreshToken = await signRefreshToken(userId);
          const validUntil = new Date();
          validUntil.setDate(validUntil.getDate() + 7);
          const saveRefreshT = await userModel.saveRefreshToken(
            updatedUser[0].key_id,
            refreshToken,
            validUntil
          );
          if (saveRefreshT.code) {
            res.json({
              status: 500,
              msg: `error ${saveRefreshT}`,
              err: saveRefreshT,
            });
          } */
          const {
            password,
            connexionTimestamp,
            creationTimestamp,
            role,
            ...other
          } = updatedUser[0];
          res.json({
            status: 200,
            //accessToken: accessToken,
            //refreshToken: accessToken,
            ...other,
            isAdmin: updatedUser[0].role === "admin",
          });
        }
      }
    }
  );

  
  //refreshToken
  app.post("/api/v1/user/refresh-token", async (req, res, next) => {
    try {
      const { userId } = req.body;
     // console.log(userId);
      if (!userId) throw createError.BadRequest();
      /*  if (!userId)
        return res.json({
          status: 401,
          message: "Unauthorized, user are not exist",
        }); */
      /*  const cookies = req.cookies;
      console.log(cookies.jwt);
      if (!cookies?.jwt)
        return res.json({
          status: 401,
          message: "Unauthorized, cookies are not exist",
        });
      const refreshTokenCookies = cookies.jwt; */

      /*  const { userId } = req.body;
      if (!userId) throw createError.BadRequest(); */

      let checkRefreshToken = await userModel.getRefreshToken(userId);

      if (checkRefreshToken.code) {
        res.json({
          status: 500,
          error: "error",
        });
      } else if (checkRefreshToken.length === 0) {
        res.clearCookie("jwt", {
          httpOnly: true,
          sameSite: "None",
          secure: true,
        });
        return res.json({
          status: 204,
          error: "refreshToken not found",
        });
      } else {
        //console.log(checkRefreshToken);
        // console.log(checkRefreshToken[0].refreshToken);
        const userId = await verifyRefreshToken(
          checkRefreshToken[0].refreshToken
        );
        const newAccessToken = await signAccessToken(userId);
        const newRefreshToken = await signRefreshToken(userId);
        const validUntil = new Date();
        validUntil.setDate(validUntil.getDate() + 7);
        let updateRefreshToken = await userModel.updateRefreshToken(
          userId,
          newRefreshToken,
          validUntil
        );

        if (updateRefreshToken.code || updateRefreshToken.affectedRows === 0) {
          throw createError.BadRequest();
        } else {
          //create Secure Cookie with the refreshTokn
          /* res.cookie("jwt", newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          }); */
          res.json({
            status: 200,
            newAccessToken: newAccessToken,
            //refreshToken: newRefreshToken,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  });

  //LOGOUT
  app.post("/api/v1/user/logout", async (req, res, next) => {
    try {
      //Clear Cookie
      /* const cookies = req.cookies;
      if (!cookies?.jwt) return res.sendStatus(204); //no content
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      res.json({ message: "Cookie cleared" }); */

      const { userId } = req.body;
      if (!userId) throw createError.BadRequest();
      //const userId = await verifyRefreshToken(refreshToken);

    /*   client.DEL(userId, (err, val) => {
        if (err) {
          console.log(err.message);
          throw createError.InternalServerError();
        }
       // console.log(val);
        res.json({
          status: 200,
          msg: `The refresh Token has been deleted`,
        });
      }); */

      let deleteRefreshToken = await userModel.deleteRefreshToken(userId);
      if (deleteRefreshToken.code) {
        res.json({
          status: 500,
          msg: `error ${deleteRefreshToken}`,
          err: deleteRefreshToken,
        });
      } else if (deleteRefreshToken.affectedRows === 0) {
        res.json({
          status: 404,
          msg: `refreshToken not found`,
          err: deleteRefreshToken,
        });
      } else {
        res.json({
          status: 200,
          affectedRows: deleteRefreshToken.affectedRows,
          msg: `The refresh Token has been deleted`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  //get one user route ----OK
  app.get("/api/v1/user/one/", withAuth, async (req, res, next) => {
    const userId = req.query.userId;
    let user = await userModel.getOneUser(userId);
    if (user.code) {
      res.json({
        status: 500,
        msg: `Something wrong with getting user`,
        err: user,
      });
    } else if (user.length === 0) {
      //on retourne un message d'erreur
      res.json({ status: 404, msg: "user not exist" });
    } else {
      res.json({ status: 200, result: user[0] });
    }
  });

  //All users
  app.get("/api/v1/user/all", withAuth, async (req, res, next) => {
    let users = await userModel.getAllUsers();
    if (users.code) {
      res.json({
        status: 500,
        msg: `Something wrong with getting users`,
        err: users,
      });
    }
    res.json({ status: 200, result: users });
  });

  //Change password
  app.put("/api/v1/user/update/pass", withAuth, async (req, res, next) => {
    let verifemail = await userModel.getUserByEmail(req.body.email);

    if (verifemail.status !== 401) {
      let newPass = await userModel.saveNewPassword(req);
      if (newPass.code) {
        res.json({ status: 500, error: newPass });
      } else {
        res.json({ status: 200, results: newPass });
      }
    } else {
      res.json({
        status: 403,
        error: "Something wrong trying save new password",
      });
    }
  });

};
