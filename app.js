const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const orderRoutes = require("./routes/orderRoutes");
const Order = require("./models/order");

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI =
  "mongodb+srv://mymongodb:mymongodbpassword@cluster0.bejyt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  // Create mongo connection
  const conn = mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get("/", (req, res) => {
  res.redirect("/index");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// registration
app.get("/sign-up", (req, res) => {
  res.render("sign-up", { title: "Sign-up" });
});

// order routes
app.use("/", orderRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
