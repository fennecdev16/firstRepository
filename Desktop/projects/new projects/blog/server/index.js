const express = require("express");
const app = express();
const path = require("path");
const corsOptions = require("./config/corsOptions");
const mysql = require("promise-mysql");
require("dotenv").config();
const cors = require("cors");



app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const messageRoutes = require("./routes/messageRoutes");
const likeRoutes = require("./routes/likeRoutes");


const host = process.env.HOST_DB;
const database = process.env.DATABASE_DB;
const user = process.env.USER_DB;
const password = process.env.PASSWORD_DB;
 

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

    app.use("/", require("./routes/rootRoute"));
    userRoutes(app, db);
    productRoutes(app, db);
    messageRoutes(app, db);
    likeRoutes(app, db);
   
  })
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Backend server is listening on port: " + PORT);
});
