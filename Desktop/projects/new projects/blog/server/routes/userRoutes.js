const withAuth = require("../middleware/withAuth");
const { signAccessToken } = require("../helpers/jwt_helper");
const { isValidPassword } = require("../helpers/bcrypt_helper");

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
          res.json({ status: 500, msg: user });
        } else {
          res.json({ status: 200, results: user });
        }
      } else {
        res.json({
          status: 403,
          msg: "Impossible d'enregistrer sur cet email",
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
  app.put("/api/v1/user/update/profile/:id", async (req, res, next) => {
    let userId = req.params.id;
    if (!req.body) throw createError.BadRequest();
    //console.log(req.body);
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
        const {
          password,
          connexionTimestamp,
          creationTimestamp,
          role,
          ...other
        } = updatedUser[0];
        res.json({
          status: 200,

          ...other,
          isAdmin: updatedUser[0].role === "admin",
        });
      }
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
  app.put("/api/v1/user/update/pass",  async (req, res, next) => {
    
    if (!req.body) throw createError.BadRequest();
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
