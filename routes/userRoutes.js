//module pour crypter et comparer par un mot de passe
const bcrypt = require('bcrypt');
const saltRounds = 10;



module.exports = (app, db) => {
    let userModel = require('../models/userModel');

    //route get de register
    app.get('/user/register', async(req, res, next) => {
        res.render('layout', { template: 'register', session: req.session })
    })

    /*---------------------------------------*/

    //route d'ajout d'un user
    app.post('/user/register', async(req, res, next) => {
        //je récup mes données je dois en premier encrypter mon mot de passe avant de stocker dans la bdd
        //on va instancier notre model (schema) avec la data
        const newUser = new userModel({
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            email: req.body.email,
            //on hash le password
            hash: await bcrypt.hash(req.body.password, saltRounds),
            role: "admin"

        })
        //on crée la data (objet) que l'on balancera dans le schema
        try {
            //(en option vous pouvez checker si l'email existe pour refusé si il y'a déjà)
            //on va sauvegarder le model avec .save()
            newUser.save();
            //redirection vers l'accueil
            res.redirect("/user/login")
            // res.redirect("/user/login")

        }
        catch (err) {
            console.log(err.message)
            res.status(500).json({ err })
        }


    })

    /*---------------------------------------*/

    //route get de login
    app.get('/user/login', async(req, res, next) => {
        res.render('layout', { template: 'login', session: req.session })
    })


    /*---------------------------------------*/

    //route post de login
    app.post('/user/login', async(req, res, next) => {

        try {
            //on recup les infos du formulaire
            const user = await userModel.findOne({ email: req.body.email });
            //on check si l'user existe dans la bdd avec son email
            !user && res.status(400).json("wrong email")
            //si il n'existe pas
            //on retourne une erreur
            // console.log(req.body.password, user.hash)
            const originalPass = bcrypt.compare(req.body.password, user.hash)
                //on compare les mdp avec bcrypt renvoi true ou false

                //si ils ne sont pas les mm
                //on retourne une erreur
                !originalPass && res.status(400).json('wrong password')


            //res.status(200).json({ user: user._doc })
            //création de la session utilisateur
            req.session.user = {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: user.role
            }
            req.session.isLogged = true
            res.redirect('/')
            //res.render('layout', { template: 'home', session: req.session })

        }
        catch (err) {
            res.status(500).json(err)
        }

    })

    /*---------------------------------------*/
    app.get('/user/logout', async(req, res, next) => {
        req.session.destroy((err) => {
            res.redirect('/')
        })

    })
    /*---------------------------------------*/

    //route pour afficher les infos du profil
    app.get('/user/profil', async(req, res, next) => {
        res.render('layout', { template: 'profil', name: "Profil", session: req.session })
    })

}
