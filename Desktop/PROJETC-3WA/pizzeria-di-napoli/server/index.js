const express = require("express");
const app = express();
const path = require("path");
const corsOptions = require("./config/corsOptions");
const mysql = require("promise-mysql");
require("dotenv").config();
const cors = require("cors");
/* app.use(cors({origin: 'https://restaurant.fenecdev.com'})); */
/* app.use(cors({credentials: true, origin: 'https://restaurant.fenecdev.com'})); */

/* 
const corsOptions ={
  origin:"https://restaurant.fenecdev.com",
  credentials:true,
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],            //access-control-allow-credentials:true
  optionSuccessStatus:200,

} */
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
/* app.use(cors({
    origin: 'http://localhost:3000'
})); */


/* app.use(cookieParser()); */
/* app.use(express.static(path.join(__dirname + "/public")));
app.use(express.urlencoded({ extended: false })); */

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const stripeRoutes = require("./routes/stripeRoutes");
const conversationsRoutes = require("./routes/conversationsRoutes");
const messagesRoutes = require("./routes/messagesRoutes");
const likeRoutes = require("./routes/likeRoutes");

const host = process.env.HOST_DB;
const database = process.env.DATABASE_DB;
const user = process.env.USER_DB;
const password = process.env.PASSWORD_DB;
//const port = process.env.PORT || config.db.port;

mysql
  .createConnection({
    host: host,
    database: database,
    user: user,
    password: password,
    //port: port
  })
  .then((db) => {
    console.log("DBConnection Success");
    setInterval(async function () {
      let res = await db.query("SELECT 1");
    }, 10000);

    /*  app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://restaurant.fenecdev.com");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
}); */
    /* app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://restaurant.fenecdev.com")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
  res.json({ msg: "Welcome to your our restaurant!", status: 200 }); 
   }); */
    /*  app.get("/", (req, res) => {
      
      res.json({ msg: "Welcome to your our restaurant!", status: 200 });
    }); */
    app.use("/", require("./routes/rootRoute"));
    userRoutes(app, db);
    productRoutes(app, db);
    orderRoutes(app, db);
    stripeRoutes(app, db);
    conversationsRoutes(app, db);
    messagesRoutes(app, db);
    likeRoutes(app, db);

   /*  app.all("*", (req, res) => {
      res.status(404);
      if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
      } else if (req.accepts("json")) {
        res.json({ error: "404 Not Found" });
      } else {
        res.type("txt").send("404 Not Found");
      }
    }); */
  })
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Backend server is listening on port: " + PORT);
});
