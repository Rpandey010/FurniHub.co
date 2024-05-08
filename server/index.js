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
const orderProductRouter = require('./routes/orderProductRoutes'); 
// const Users = require('./model/user.model');

// const admin = require('firebase-admin');
// const serviceAccount = require('./furnihub-52977-firebase-adminsdk-qf5i9-bc6404b042.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

app.use(express.json());
app.use(cors());

// Database Connection With MongoDB
mongoose.connect("mongodb+srv://aryansharma21:Furnihub123@cluster0.0qhzcry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/e-commerce");



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
        image_url: `https://furnihub-co-server.onrender.com/images/${req.file.filename}`
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

app.use('/order-products', orderProductRouter); // Use the order product router for the '/order-products' endpoint

app.get("/", (req, res) => {
  res.send("Root");
});

// Use cart routes
app.use('/cart', cartRouter);

app.post('/orders/check-email', async (req, res) => {
  const { email } = req.body;
  try {
      const user = await Users.findOne({ email: email });
      if (!user) {
          return res.status(404).json({ success: false, message: "Email ID not found." });
      }
      return res.json({ success: true, message: "Email ID found." });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: error.message });
  }
});

// Error Handling middleware
app.listen(port, (error) => {
  if (!error) console.log("Server Running on port " + port);
  else console.log("Error : ", error);
});
