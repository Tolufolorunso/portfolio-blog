const cors = require("cors");
const compression = require("compression");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const { appTime, globalError } = require("./middlewares/middleware");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
require("dotenv").config();

const adminRoutes = require("./routes/adminRoutes");
const blogRoutes = require("./routes/blogRoutes");
const adminCrudRoutes = require("./routes/adminCrudRoutes");

const app = express();

const store = new MongoDBSession({
  uri: "mongodb://localhost:27017/Tolu-blog",
  collection: "sessions",
});
// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "my screct",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(methodOverride("_method"));

app.use(morgan("dev"));
app.use(cors());
app.use(express.static(`${__dirname}/public`));
app.set("view engine", "ejs");

// Customs Middleware
app.use(appTime);
app.use(compression());

app.use("/admin", adminRoutes);
app.use("/blog", blogRoutes);
app.use("/dashboard", adminCrudRoutes);

app.get("/", (req, res) => {
  res.status(200).render("index", {
    title: "Tolu's personal page",
    time: req.time,
    isAuthenticated: false,
  });
});
app.get("*", (req, res) => {
  res.status(200).render("404", {
    title: "404 Page",
    time: req.time,
    isAuthenticated: false,
  });
});

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((c) => console.log("DATABASE connection successfull"))
  .catch(() => console.log("not connected to db"));

app.use(globalError);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // console.log(`Server started on ${PORT}`);
});
