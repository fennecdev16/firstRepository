const withAuth = require("../middleware/withAuth");
const stripe = require("stripe")(process.env.STRIPE_KEY);

//payment route

module.exports = (app, db) => {
  const orderModel = require("../models/OrderModel")(db);
  const productModel = require("../models/ProductModel")(db);
 
  app.post("/api/v1/checkout/payment", withAuth, async (req, res, next) => {
    stripe.charges.create(
      {
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "eur",
      },
      (stripeError, stripeRes) => {
        if (stripeError) {
          res.status(500).json(stripeError);
        } else {
          res.status(200).json(stripeRes);
        }
      }
    );
  });
};
