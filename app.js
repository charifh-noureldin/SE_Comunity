const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");
const Order = require("./models/order");
const User = require("./models/user");
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

// express app
const app = express();

// view engine
app.set('view engine', 'ejs');

// connect to mongodb & listen for requests
const dbURI =
  "mongodb+srv://mymongodb:mymongodbpassword@cluster0.bejyt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  // Create mongo connection
  const conn = mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3333))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});
app.get('*', checkUser);

// routes
app.get("/", (req, res) => {
  res.redirect("/index");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
app.get("/questions", (req, res) => {
  res.render("questions", { title: "Questions" });
});

app.get("/index", (req, res) => {
  res.render("index", { title: "Home" });
});


// order routes
app.use("/user", authRoutes);
app.use("/orders", requireAuth, orderRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
