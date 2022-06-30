module.exports = (app, db) => {
    let productModel = require('../models/produitsModel');

    //route get de tous les produits
    app.get('/produits', async(req, res, next) => {
        try {
            //récupération de tous les produits ds la bdd
            let products = await productModel.find().sort({ createdAt: -1 })

                !products && res.status(400).json("no product found")
            //affichage
            res.render('layout', { template: 'produits', products: products, session: req.session })
        }
        catch (err) {
            res.status(500).json(err)

        }

    })

    /*---------------------------------------*/

    //une route get d'ajout des produits pour afficher le formulaire
    app.get('/addProd', async(req, res, next) => {
        res.render('layout', { template: 'addProd', session: req.session })
    })

    /*---------------------------------------*/

    //une route post pour les produits
    app.post('/addProd', async(req, res, next) => {
        //on crée l'objet du produit

        //on va instancier notre model (schema) avec l'objet
        const newProduct = new productModel(req.body)
        try {

            //on va sauvegarder le model avec .save()
            newProduct.save()
            //on redirige vers l'admin
            res.redirect("/admin")
        }
        catch (err) {
            res.status(500).json(err)
        }
        //res.render('layout', { template: 'produits', session: req.session })
    })
    /*---------------------------------------*/

    //une get route edit d'un produit (attention: bien prendre l'id)
    app.get('/editProd/:id', async(req, res, next) => {

        try {
            //on récup le produit par son id
            const singleProd = await productModel.findById(req.params.id);
            //si il ne trouve pas de produit
            //on retourne une erreur
            !singleProd && res.status(400).json("product not found")
            // res.status(200).json(singleProd)
            //on affiche le template du formulaire
            res.render('layout', { template: 'editProd', singleProd: singleProd, session: req.session })
        }
        catch (err) {
            res.status(500).json(err)
        }

    })
    /*---------------------------------------*/

    //route post editProd
    app.post("/editProd/:id", async(req, res, next) => {
        try {
            //on appel une fonction de modification d'un produits (par son id) en lui envoyant un nouvel objet
            const updatedProd = await productModel.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true })


            //on redirige vers l'admin
            res.redirect("/admin")

        }
        catch (err) {
            res.status(500).json(err)
        }
    })

    /*---------------------------------------*/
    //une route de suppression d'un produit (attention: bien prendre l'id)
    app.get("/deleteProd/:id", async(req, res, next) => {
        try {
            //on appel une fonction de suppression d'un produit (par son id)
            await productModel.findByIdAndDelete(req.params.id)
            //on redirige vers l'admin
            res.redirect("/admin")
        }
        catch (err) {
            res.status(500).json(err)
        }
    })

    /*---------------------------------------*/

    //on affiche le template d'admin avec les produits
    //route pour la page admin

    app.get('/admin', async(req, res, next) => {
        try {
            //on récup tous les produits
            let products = await productModel.find().sort({ createdAt: -1 })
                //si il y'a une erreur

                //on retourne la page d'admin avec un tableau vide pour les produits
                !products && res.render('layout', { template: 'admin', products: products = [], session: req.session })
            res.render('layout', { template: 'admin', products: products, session: req.session })

        }

        catch (err) {
            res.status(500).json(err)

        }

    })

}
