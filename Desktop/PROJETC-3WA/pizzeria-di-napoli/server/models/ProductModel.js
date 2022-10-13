module.exports = (_db) => {
  db = _db;
  return ProductModel;
};

class ProductModel {
  //get all products
  static getAllProducts() {
    return db
      .query("SELECT * FROM products") 
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

    //get featured dishes
    static getFeatured() {
      return db
        .query("SELECT * FROM products WHERE isTopOfTheWeek= ?", [1])
  
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
        "INSERT INTO products  (name, `desc`,price1, price2, price3, photo, isTopOfTheWeek, isDietetic, isPizza,delivery1,delivery2,delivery3, extra1, extra2,extra3, extra4, extra1_price, extra2_price, extra3_price, extra4_price) VALUES (?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          req.body.name,
          req.body.desc,
          req.body.price1,
          req.body.price2,
          req.body.price3,
          req.body.img,
          req.body.isTopOfTheWeek,
          req.body.isDietetic,
          req.body.isPizza,
          req.body.delivery1,
          req.body.delivery2,
          req.body.delivery3,
          req.body.extra1,
          req.body.extra2,
          req.body.extra3,
          req.body.extra4,
          req.body.extra1_price,
          req.body.extra2_price,
          req.body.extra3_price,
          req.body.extra4_price,
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
        "UPDATE products SET name=?, `desc`=?,price1=?, price2=?, price3=?, photo=?, isTopOfTheWeek=?, isDietetic=?, isPizza=?,delivery1=?,delivery2=?,delivery3=?, extra1=?, extra2=?,extra3=?, extra4=?, extra1_price=?, extra2_price=?, extra3_price=?, extra4_price=? WHERE product_id=?",
        [
          req.body.name,
          req.body.desc,
          req.body.price1,
          req.body.price2,
          req.body.price3,
          req.body.img,
          req.body.isTopOfTheWeek,
          req.body.isDietetic,
          req.body.isPizza,
          req.body.delivery1,
          req.body.delivery2,
          req.body.delivery3,
          req.body.extra1,
          req.body.extra2,
          req.body.extra3,
          req.body.extra4,
          req.body.extra1_price,
          req.body.extra2_price,
          req.body.extra3_price,
          req.body.extra4_price,
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
