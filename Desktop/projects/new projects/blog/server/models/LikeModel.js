

module.exports = (_db) => {
  db = _db;
  return LikeModel;
};

class LikeModel {
  static async saveOneLike(product_id, key_id) {
    return db
      .query(
        "INSERT INTO likesproduct (key_id,product_id,likedislike, creationTimestamp) VALUES (?,?, 1, NOW())",
        [key_id, product_id] /*  */
      )
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  }
  static async updateOneLike(product_id, key_id, likedislike) {
    return db
      .query(
        "UPDATE likesproduct SET likedislike = ? WHERE key_id = ? AND product_id = ?",
        [likedislike, key_id, product_id]
      )
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  }

  // get like by productId
  static getLikeByProductId(product_id, key_id) {
    return db
      .query(
        "SELECT likedislike FROM likesproduct WHERE product_id = ?  and key_id = ? ",
        [product_id, key_id]
      )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
    }
      // likes of user
  static getLikesOfUser(key_id,) {
    return db
      .query("SELECT * FROM likesproduct WHERE key_id = ? AND likedislike = ?", [
        key_id, 1
      ])

      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }
  
      //total likes of product
  static getLikesOfOneProduct() {
    return db
      .query("SELECT product_id, count(likedislike) as totalLikes FROM likesproduct WHERE likedislike = ? GROUP BY product_id", [
        1
      ])

      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }
  
  
}
