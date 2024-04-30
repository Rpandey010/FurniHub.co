const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const Users = require('./model/user.model');
const Product = require('./model/product.model');
const subscribe = require('./model/subscriber.model');
const productRouter  = require('./routes/product.routes');
const subscribeRoutes = require('./routes/subscribe.routes'); 
const cartRouter = require('./routes/cart.routes');
const authRoutes = require('./routes/auth.routes'); 
const paymentRoutes = require('./routes/payment.route');
const orderRoutes = require('./routes/order.routes');

app.use(express.json());
app.use(cors());

// Database Connection With MongoDB
mongoose.connect("mongodb+srv://aryansharma21:aryanrandi@cluster0.0qhzcry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/e-commerce");


//Image Storage Engine 
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
      console.log(file);
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage: storage})
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:4000/images/${req.file.filename}`
    })
})
app.use('/images', express.static('upload/images'));


// // MiddleWare to fetch user from database
const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};

// Use auth routes
app.use('/', authRoutes);

// Use product routes
app.use('/products', productRouter);

// subscribe
app.use('/subscribe', subscribeRoutes);

// Payment
app.use('/payment', paymentRoutes);

// order
app.use('/orders', orderRoutes);

app.get("/", (req, res) => {
  res.send("Root");
});

// Use cart routes
app.use('/cart', cartRouter);

// Error Handling middleware
app.listen(port, (error) => {
  if (!error) console.log("Server Running on port " + port);
  else console.log("Error : ", error);
});
