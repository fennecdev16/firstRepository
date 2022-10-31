const withAuth = require("../middleware/withAuth");

module.exports = (app, db) => {
  const likeModel = require("../models/LikeModel")(db);

  //like / dislike a post
  app.put(
    "/api/v1/product/:productId/like",
    async (req, res, next) => {
      let product_id = req.params.productId;
      let key_id = req.body.key_id;
      let likedislike = req.body.likedislike;

      let isLikeExist = await likeModel.getLikeByProductId(product_id, key_id);
      if (isLikeExist.code) {
        res.json({ status: 500, error: isLikeExist });
      } else {
        if (isLikeExist.length > 0) {
          //res.json({ status: 200, results: isLikeExist[0].likedislike });
          let likeValue = isLikeExist[0].likedislike === 0 ? 1 : 0;

          let updatelike = await likeModel.updateOneLike(
            product_id,
            key_id,
            likeValue
          );
          if (updatelike.code) {
            res.json({ status: 500, error: updatelike });
          } else {
            res.json({ status: 200, results: updatelike });
          }
        } else {
          let adlike = await likeModel.saveOneLike(product_id, key_id);
          if (adlike.code) {
            res.json({ status: 500, error: adlike });
          } else {
            res.json({ status: 200, results: adlike });
          }
        }
      }

     
    }
  );

  //route to get likes of userId

  app.post("/api/v1/product/like", async (req, res, next) => {
    let likesOfUser = await likeModel.getLikesOfUser(req.body.key_id);
    if (likesOfUser.code) {
      res.json({
        status: 500,
        msg: `Something wrong with getting likes of user`,
        err: likesOfUser,
      });
    } else if (likesOfUser.length === 0) {
      //on retourne un message d'erreur
      res.json({ status: 404, msg: "no likes for the current user" });
    } else {
      res.json({ status: 200, result: likesOfUser });
    }
  });
  //route to total likes of product_id

  app.get("/api/v1/product/likes", async (req, res, next) => {
    let likesOfOneUser = await likeModel.getLikesOfOneProduct(
      req.body.product_id
    );
    if (likesOfOneUser.code) {
      res.json({
        status: 500,
        msg: `Something wrong with getting likes of product`,
        err: likesOfOneUser,
      });
    } else if (likesOfOneUser.length === 0) {
      //on retourne un message d'erreur
      res.json({ status: 404, msg: "no likes for the current product" });
    } else {
      res.json({ status: 200, result: likesOfOneUser });
    }
  });
};
