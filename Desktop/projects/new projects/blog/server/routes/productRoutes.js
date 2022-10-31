const fs = require("fs"); //va nous permettre de supprimer des images locales
const withAuth = require("../middleware/withAuth");

module.exports = (app, db) => {
  const productModel = require("../models/ProductModel")(db);

  
  //route getting all products Or by category
  app.get("/api/v1/product/all/:categ", async (req, res, next) => {
    const categ = req.params.categ;
    if (!categ || categ === "undefined") {
    let products = await productModel.getAllProducts();
    if (products.code) {
      res.json({
        status: 500,
        msg: `Something wrong`,
        err: products,
      });
    } else {
      res.json({ status: 200, result: products, msg: "Ok" });
    }} else{
      
      let cat;
      switch (categ) {
        case "Sport":
          cat = "IsSport";
          break;
        case "Nature":
          cat = "isNature";
          break;
        case "Adventure":
          cat = "isAdventure";
          break;
        default:
          break;
      }
      
      let products = await productModel.getProductsByCat(cat);
    if (products.code) {
      res.json({
        status: 500,
        msg: `Something wrong`,
        err: products,
      });
    } else {
      res.json({ status: 200, result: products, msg: "Ok" });
    }
    }
  });
  app.get("/api/v1/product/featured", async (req, res, next) => {
   
      let featued = await productModel.getFeatured();
      if (featued.code) {
        res.json({
          status: 500,
          msg: `Something wrong`,
          err: featued,
        });
      } else {
        res.json({ status: 200, result: featued, msg: "Ok" });
      
    }
  });

  //route getting one product
  app.get("/api/v1/product/one/:id", async (req, res, next) => {
    let id = req.params.id;
    let product = await productModel.getOneProduct(id);
    if (product.code) {
      res.json({
        status: 500,
        msg: `Something wrong with getting ${product}`,
        err: product,
      });
    } else if (product.length === 0) {
      //on retourne un message d'erreur
      res.json({ status: 404, msg: "product not exist" });
    } else {
      res.json({ status: 200, result: product[0] });
    }
  });

  //route to save one product ---OK
  app.post("/api/v1/product/save", async (req, res, next) => {
    let product = await productModel.saveOneProduct(req);
  
    if (product.code) {
      res.json({
        status: 500,
        msg: `Something wrong with getting ${product}`,
        err: product,
      });
    } else {
      res.json({
        status: 200,
        msg: `${product} successfully created `,
        result: product,
      });
    }
  });

  //route upade one product
  app.put("/api/v1/product/update/:id",  async (req, res, next) => {
    let id = parseInt(req.params.id);
    if (!req.body) throw createError.BadRequest();
    let updateProduct = await productModel.updateOneProduct(req, id);
    if (updateProduct.code) {
      res.json({
        status: 500,
        msg: `error with updating ${updateProduct}`,
        err: updateProduct,
      });
    } else {
      res.json({
        status: 200,
        msg: `${updateProduct} successfully updated`,
        result: updateProduct,
      });
    }
  });

  //route delete one product -----OK
  app.delete("/api/v1/product/delete/:id", withAuth, async (req, res, next) => {
    let id = req.params.id;
    let product = await productModel.getOneProduct(id);
    if (product.code) {
      res.json({
        status: 500,
        msg: `error with getting ${product} to delete`,
        err: product,
      });
    } else {
      let deleteProduct = await productModel.deleteOneProduct(id);
      if (deleteProduct.code) {
        res.json({
          status: 500,
          msg: `error with deleting ${product}`,
          err: deleteProduct,
        });
      } else {
        res.json({
          status: 200,
          result: deleteProduct,
          msg: `The product n° ${id} has been deleted`,
        });
      }
    }
  });
  //route getting all products
  app.get("/api/v1/cat/all", async (req, res, next) => {
    let products = await productModel.getCategories();
    if (products.code) {
      res.json({
        status: 500,
        msg: `Something wrong with getting ${cat}`,
        err: products,
      });
    } else {
      res.json({ status: 200, result: products, msg: "Ok" });
    }
  });
};
