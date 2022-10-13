module.exports = (_db) => {
  db = _db;
  return OrderModel;
};

class OrderModel {
  //get all products ------OK
  static getAllOrders() {
    return db
      .query(
        `SELECT orders.order_id, users.firstName,  users.lastName,users.zip,  orders.totalAmount, orders.method ,orders.status FROM  orders  
      inner join  users ON  orders.user_id =  users.key_id where method = ? OR method =? ORDER BY orders.creationTimestamp DESC `,
        ["payed", "cash"]
      )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  //-------------------------OK
  static saveOneOrder(user_id, totalAmount) {
    return db
      .query(
        'INSERT INTO orders (user_id, totalAmount, creationTimestamp, method, status) VALUES (?, ?, NOW(),"payed",  0)',
        [user_id, totalAmount]
      )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  // ------------------------OK
  static saveOneOrderDetail(order_id, product_id, quantity, price) {
    //ici product est un objet représentant un produit, il aura des propriété nécéssaire pour notre requète product.id et product.quantityInCart
    // let total = parseInt(product.quantityInCart) * parseFloat(product.safePrice);
    return db
      .query(
        "INSERT INTO orderdetails (order_id, product_id, quantity, price, total) VALUES (?,?,?,?,?)",
        [order_id, product_id, quantity, price, quantity*price]
      )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  //modification du montant total
  static updateTotalAmount(order_id, totalAmount) {
    return db
      .query("UPDATE orders SET totalAmount = ? WHERE id = ?", [
        totalAmountorder_id,
      ])
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  //getting one order ---OK
 /*  static getOneOrder(id) {
    return db
      .query("SELECT * FROM orders WHERE order_id = ?", [id])
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  } */

  //getting one order/currentuser---OK

  static getOneOrder(userId) {
    return db
      .query(
        `SELECT orders.order_id, orders.totalAmount, orders.method ,orders.status, users.creationTimestamp,users.firstName,  users.lastName,users.zip FROM  
        orders inner join  users ON  users.key_id =  orders.user_id
        where orders.user_id=? order by orders.order_id  desc limit 2`,
        [userId]
      )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }
  //getting one orderDetails/currentuser---OK
  static getOneOrderDetail(orderId) {
    return db
      .query(
        `SELECT orderdetails.order_id, orderdetails.product_id, products.name, orderdetails.quantity , orderdetails.price,  orderdetails.total 
        FROM  orders  
              inner join   orderdetails ON  orderdetails.order_id = orders.order_id
               inner join   products ON  products.product_id =  orderdetails.product_id 
               where orders.order_id = ?`,
        [orderId]
      )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  //update order status -------OK
  static updateStatus(orderId, status) {
    return db
      .query("UPDATE orders SET status = ? WHERE order_id = ?", [
        status,
        orderId,
      ])
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }
}
