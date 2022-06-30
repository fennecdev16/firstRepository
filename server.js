const express = require('express');
const app = express();
//ici on recup tout le dossier pubic (css, fonts, img, js)
app.use(express.static(__dirname + '/public'));
//ici on gère l'affichage des templates front
app.set('views', './views');
app.set('view engine', 'ejs');

//parse les url
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const cors = require('cors');
let session = require('express-session');
let parseurl = require('parseurl');

//session va gérer la création/vérification du token lors du login
app.use(session({
    secret: 'love kevin',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }
}))

app.use(function(req, res, next) {
    if (!req.session.user) {
        req.session.user = null
        req.session.isLogged = false
    }

    // get the url pathname   pathname est la section de chemin de l'URL, qui vient après l'hôte et avant la requête
    let pathname = parseurl(req).pathname
    //gestion des routes protégées
    let protectedPath = ["/admin", "/add_prod", "/edit_prod", "/delete_prod", "/produits", "/profil"];
    // route uniquement pour l'admin

    let onlyAdmin = ["/admin"] // routes uniquement pour l'admin

    //conditions pour les accés aux routes avec restrictions qui redirigent vers le login si il n'est pas connecté ou admin
    if ((protectedPath.indexOf(pathname) !== -1 || onlyAdmin.indexOf(pathname) !== -1) && req.session.isLogged === false) {
        //on redirige vers login
        res.redirect('/login')
        //sinon si la route est une route d'admin et qu'il n'est pas admin
    }
    else if (onlyAdmin.indexOf(pathname) !== -1 && req.session.user.role !== "admin") {
        //on redirige vers l'accueil
        res.redirect('/')
        //sinon
    }
    else {
        //un next
        next()
    }
})

const userRoutes = require('./routes/userRoutes');
const produitsRoutes = require('./routes/produitsRoutes');

const mongoose = require('mongoose');

// Configuration de l'objet Promise utilisÃ© par mongoose (ici, ce seront celles dans Node.js -> global.Promise)
mongoose.Promise = global.Promise;

// Adapter en fonction de la configuration sur le compte "Atlas"
//const connectionString = 'mongodb+srv://monesma:azerty1234@monesma.6yr2g.mongodb.net/monesmadb?retryWrites=true&w=majority';
const MONGO_USER = "sam"
const MONGO_PASS = "DaklzxFN5W7WCI3C"
const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster1.mszh97c.mongodb.net/3wademo?retryWrites=true&w=majority`

// Connexion Ã  la base mongo ...
mongoose
    .connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((db) => {

        // Démarrage du serveur (qui ne démarre QUE si la connexion Ã  la base mongo est bien établie!)
        console.log("backend online")


        app.get('/', (req, res) => {
            res.render('layout', { template: "home", name: "Home", session: req.session })
        })

        app.get('/essai', (req, res) => {
            res.json({ post: "tueur", crimes: 322 })
        })
        //appel de nos routes
        userRoutes(app, db)
        produitsRoutes(app, db)

        app.listen(9000, function() {
            console.log("Le serveur écoute l'url: http://samircherifi.ide.3wa.io:9000/");
        });
    })
    .catch(err => console.error(err.message));
