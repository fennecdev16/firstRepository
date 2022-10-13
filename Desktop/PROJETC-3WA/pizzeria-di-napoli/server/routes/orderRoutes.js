
const withAuth = require("../middleware/withAuth");

module.exports = (app, db) => {
  const orderModel = require("../models/OrderModel")(db);
  const productModel = require("../models/ProductModel")(db);

  //route de sauvegarde d'une commande
  app.post("/api/v1/order/save", withAuth, async (req, res, next) => {
    let user_id = req.body.userId;
    let totalAmount = req.body.totalAmount;
    //enregistrement de l'order (fonction)
    let newOrder = await orderModel.saveOneOrder(user_id, totalAmount);
    if (newOrder.code) {
      res.json({
        status: 500,
        msg: `Something wrong with saving ${newOrder}`,
        err: newOrder,
      });
    } else {
      //get the inserted order id
      let orderId = newOrder.insertId;
      let productDetails = req.body.productsData;
      productDetails.map(async (product) => {
        let orderDetail = await orderModel.saveOneOrderDetail(
          orderId,
          product.product_id,
          product.quantity,
          product.price
        );
        if (orderDetail.code) {
          res.json({
            status: 500,
            msg: `Something wrong with saving ${orderDetail}`,
            err: orderDetail,
          });
        }
      });
      res.json({ status: 200, orderId: orderId, newOrder: newOrder });
    }
  });

  //route updating order status ---------OK
  app.put("/api/v1/order/status", withAuth, async (req, res, next) => {
    //fonction de modification du status de paiement de la commande
    let status = await orderModel.updateStatus(
      req.body.order_id,
      req.body.status
    );
    if (status.code) {
      res.json({
        status: 500,
        msg: `Something wrong with updating ${status}`,
      });
    } else {
      res.json({
        status: 200,
        result: status,
        msg: `status updated, orderID :${req.body.order_id}, status: ${req.body.status}`,
      });
    }
  });

  //route getting all orders ----OK
  app.get("/api/v1/order/all", withAuth, async (req, res, next) => {
    let orders = await orderModel.getAllOrders();
    if (orders.code) {
      res.json({
        status: 500,
        msg: `Something wrong with getting ${orders}`,
        err: orders,
      });
    }
    res.json({ status: 200, result: orders });
  });

  //route getting one Order/currentuser
  app.get("/api/v1/order/one/:id", withAuth, async (req, res, next) => {
    let id = req.params.id;
    let order = await orderModel.getOneOrder(id);
    if (order.code) {
      res.json({
        status: 500,
        msg: `Something wrong with getting ${order}`,
        err: order,
      });
    }
    if (order.length === 0) {
      //on retourne un message d'erreur
      res.json({ status: 404, msg: "no order yet !" });
    } else {
      res.json({ status: 200, result: order[0] });
    }
  });
  //route getting one Order/currentuser
  app.get("/api/v1/orderDetails/:id", withAuth, async (req, res, next) => {
    let id = req.params.id;
    let orderDetails = await orderModel.getOneOrderDetail(id);
    if (orderDetails.code) {
      res.json({
        status: 500,
        msg: `Something wrong with getting ${orderDetails}`,
        err: orderDetails,
      });
    }
    if (orderDetails.length === 0) {
      //on retourne un message d'erreur
      res.json({ status: 404, msg: "no order details yet !" });
    } else {
      res.json({ status: 200, result: orderDetails });
    }
  });
};
