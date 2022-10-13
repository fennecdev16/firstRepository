
let randomId = require("random-id");
let len = 30;
let pattern = "aA0";
const { encryptPassword } = require("../helpers/bcrypt_helper");

module.exports = (_db) => {
  db = _db;
  return UserModel;
};

class UserModel {
  //save a new user
  static async saveOneUser(req) {
    //on hash le password
    if (req.body.password !==req.body.confirmPassword) {
      return { status: 502, msg: `passwords doesn't match` };
    }
   // let hash = await bcrypt.hash(req.body.password, saltRounds);
  
    //on génère un id personalisé
    let key_id = randomId(len, pattern);
    //console.log(key_id)
    
    let user = await db.query("SELECT * FROM users WHERE email = ?", [
      req.body.email,
    ]);

    if (user.length > 0) {
      return { status: 501, msg: `email (${req.body.email}) already in use` };
    }
    //on sauvegarde l'utilisateur
    const hash = await encryptPassword(req.body.password)
    console.log(hash);
    return db
      .query(
        'INSERT INTO users (key_id, firstName, lastName, email, password, role, address, zip, city, country, phone,profilePicture, creationTimestamp, connexionTimestamp) VALUES (?, ?,?, ?, ?,  "user",?, ?, ?, ?, ?,"", NOW(), NOW())',
        [
          key_id,
          req.body.firstname,
          req.body.lastname,
          req.body.email,
          hash,
          req.body.address,
          req.body.zip,
          req.body.city,
          req.body.country,
          req.body.phone,
        ]
      )

      .then((result) => {
        //on retourne l'objet de reponse reussit en lui rajoutant le key_id
        result.key_id = key_id;
        return result;
      })
      .catch((err) => {
        return err;
      });
  }


  //Save new password
  static async saveNewPassword(req) {
    //on hash le password
    if (req.body.password !==req.body.confirmPassword) {
      return { status: 502, msg: `passwords doesn't match` };
    }
    //let hash = await bcrypt.hash(req.body.password, saltRounds);
    let user = await db.query("SELECT * FROM users WHERE email = ?", [
      req.body.email,
    ]);

    if (user.length === 0) {
      return { status: 501, msg: `email (${req.body.email}) not found` };
    }
    //on sauvegarde l'utilisateur
    const hash = await encryptPassword(req.body.password)
    return db
      .query(
        "UPDATE users SET password = ? WHERE email = ?",
        [
          hash,
          req.body.email,
        ]
      )
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  }

  //récupération d'un utilisateur en fonction de son mail
  static getUserByEmail(email) {
    return db
      .query("SELECT * FROM users WHERE email = ?", [email])
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }
  

  
  //modification d'un utilisateur
  static updateUser(req, userId) {
    return db
      .query(
        "UPDATE users SET firstName = ?, lastName = ?, address = ?, zip = ?, city = ?, country=?, phone = ? WHERE key_id = ?",
        [
          req.body.firstname,
          req.body.lastname,
          req.body.address,
          req.body.zip,
          req.body.city,
          req.body.country,
          req.body.phone,
          userId,
        ]
      )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  //get one User
  static getOneUser(userId) {
    return db.query('SELECT * FROM users WHERE key_id = ?', [userId])
    
        .then((response) => {
            return response
        })
        .catch((err) => {
            return err
        })
}

static getAllUsers() {
  return db.query('SELECT key_id, firstname, lastname, profilePicture FROM users')
  
      .then((response) => {
          return response
      })
      .catch((err) => {
          return err
      })
}
// save refreshToken

static saveRefreshToken(userId, refreshToken, validUntil) {
  return db
    .query(
      'INSERT INTO refreshtoken (userId, refreshToken, validuntil) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE refreshToken = ?, validuntil = ?',
      [userId, refreshToken, validUntil, refreshToken, validUntil]
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
}

 //LOGOUT
 static deleteRefreshToken(userId) {
  return db
    .query("DELETE FROM refreshtoken WHERE userId = ?", [userId])
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
}

//get refreshToken
static getRefreshToken(userId) {
  return db
    .query("SELECT * FROM refreshtoken WHERE userId = ?", [userId])
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
}

//update refreshToken
static updateRefreshToken(userId, refreshToken, validUntil) {
  return db
    .query(
      "UPDATE refreshtoken SET refreshToken = ?, validUntil = ? WHERE userId = ?",
      [
        refreshToken,
        validUntil,
        userId
      ]
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
}

}
