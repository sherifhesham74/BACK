const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
//express app
const app = express();

const usersRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const carsShopRouter = require("./routes/cars_shop");
const carsnewRouter = require("./routes/carsnew");
const carsusedRouter = require("./routes/carsused");
const schoolsRouter = require("./routes/schools");
const maintainRouter = require("./routes/maintain");
const accessShopRouter = require("./routes/accessories_shop");
const accessRouter = require("./routes/accessories");
// const cartRouter = require("./routes/cart");

//middleware
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static("images"));
app.use(cors());
//routes
app.use("/users", usersRouter);
app.use("/admins", adminRouter);
app.use("/carsshops", carsShopRouter);
app.use("/newcars", carsnewRouter);
app.use("/usedcars", carsusedRouter);
app.use("/schools", schoolsRouter);
app.use("/maintains", maintainRouter);
app.use("/accessShops", accessShopRouter);
app.use("/accessories", accessRouter);

app.use(function(req, res, next) {
      // res.header("Access-Control-Allow-Origin", "*");
      const allowedOrigins = ['http://localhost:3000', 'http://kalaks.onrender.com', 'https://kalaks.onrender.com'];
      const origin = req.headers.origin;
      if (allowedOrigins.includes(origin)) {
           res.setHeader('Access-Control-Allow-Origin', origin);
      }
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      res.header("Access-Control-Allow-credentials", true);
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
      next();
    });
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin: *');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });
// app.use("/cart", cartRouter);
app.get("/", (req, res) => {
  res.json({ mssg: "Welcom to the app" });
});

//database connection
mongoose.connect("mongodb://sheka:sheka@ac-xvjtcbx-shard-00-00.vpe4skm.mongodb.net:27017,ac-xvjtcbx-shard-00-01.vpe4skm.mongodb.net:27017,ac-xvjtcbx-shard-00-02.vpe4skm.mongodb.net:27017/?ssl=true&replicaSet=atlas-j9s119-shard-0&authSource=admin&retryWrites=true&w=majority", (err) => {
  if (!err) return console.log("DB Connected");
  console.log(err);
});

//listen for requsts
app.listen(process.env.PORT, () => {
  console.log(`listening on port`, process.env.PORT);
});


// const corsOptions = {
//   origin: "http://localhost:3000",
//   optionsSuccessStatus: 200,
// };
// Add headers before the routes are defined



// app.get("/" , (req,res)=>{
//   res.setHeader("Access-Control-Allow-Credentials","true");
//   res.send("api is running");
// });
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);


const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 20000, name: "Learn CSS Today" }],
]);

app.post("/payment", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        // const storeItem = accessories.findone(item._id);
        // const storeItem= accessModel.findById({_id:item.id})

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `http://localhost:3000/`,
      // cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    });
    res.json({ url: session.url });
    // res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

