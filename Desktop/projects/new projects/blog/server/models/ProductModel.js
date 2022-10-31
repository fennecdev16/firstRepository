module.exports = (_db) => {
  db = _db;
  return ProductModel;
};

class ProductModel {
  //get all products
  static getAllProducts() {
    return db
      .query(`SELECT * FROM products order by creationTimestamp desc`)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }
  static getProductsByCat(cat) {
    return db
      .query(`SELECT * FROM products where ${cat}=?`, [1])
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  //get featured post
  static getFeatured() {
    return db
      .query("SELECT * FROM products WHERE isNature= ?", [1])

      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }
  //get featured post
  static getCategories() {
    return db
      .query("SELECT * FROM category")

      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  //get one product
  static getOneProduct(id) {
    return db
      .query("SELECT * FROM products WHERE product_id = ?", [id])

      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  //save product ---OK
  static saveOneProduct(req) {
    return db
      .query(
        "INSERT INTO products  (name, `desc` , photo, isNature, isSport, isAdventure) VALUES (?, ?,?,?,?,?)",
        [
          req.body.name,
          req.body.desc,
          req.body.img,
          req.body.isNature,
          req.body.isSport,
          req.body.isAdventure,
        ]
      )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  //update product
  static updateOneProduct(req, product_id) {
    return db
      .query(
        "UPDATE products SET name=?, `desc`=?, photo=?, isNature=?, isSport=?, isAdventure=? WHERE product_id=?",
        [
          req.body.name,
          req.body.desc,
          req.body.img,
          req.body.isNature,
          req.body.isSport,
          req.body.isAdventure,
          product_id,
        ]
      )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  //delete one product -----OK
  static deleteOneProduct(id) {
    return db
      .query("DELETE FROM products WHERE product_id = ?", [id])
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }
}
