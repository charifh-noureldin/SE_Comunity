const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const orderRoutes = require("./routes/orderRoutes");
const Order = require("./models/order");

const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI =
  "mongodb+srv://mymongodb:mymongodbpassword@cluster0.bejyt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// middleware & static files
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

app.get("/orders", (req, res) => {
  // res.render('orders', { title: 'All Orders' });
  Order.find()
    .then((result) => {
      res.render('orders', { title: 'All Orders', orders: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/orders", (req, res) => { 
  const order = new Order(req.body);
  order.save()
    .then((result) => {
      res.redirect('/orders');
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/orders/:id', (req, res) => {
  const id = req.params.id;
  Order.findById(id)
    .then(result => {
      res.render('details', { order: result, title: 'Order Details' });
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'Order not found' });
    });
});

app.get("/new-order", (req, res) => {
  res.render("new-order", { title: "New Order" });
});

app.get("/details", (req, res) => {
  res.render("details", { title: "Sign-up" });
});

// registration
app.get("/sign-up", (req, res) => {
  res.render("sign-up", { title: "Sign-up" });
});


// Init gfs
let gfs;
// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

// @route GET /
// @desc Loads form
app.get('/', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      res.render('index', { files: false });
    } else {
      files.map(file => {
        if (
          file.contentType === 'image/jpeg' ||
          file.contentType === 'image/png'
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      res.render('index', { files: files });
    }
  });
});

// @route POST /upload
// @desc  Uploads file to DB
app.post('/upload', upload.single('file'), (req, res) => {
  // res.json({ file: req.file });
  res.redirect('/');
});



// order routes
app.use("/index", orderRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
