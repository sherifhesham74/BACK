const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
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
const cartRouter = require("./routes/cart");

//middleware
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static("images"));

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
app.use("/cart", cartRouter);
app.get("/", (req, res) => {
  res.json({ mssg: "Welcom to the app" });
});

//database connection
mongoose.connect("mongodb://127.0.0.1:27017/gpproject", (err) => {
  if (!err) return console.log("DB Connected");
  console.log(err);
});

//listen for requsts
app.listen(process.env.PORT, () => {
  console.log(`listening on port`, process.env.PORT);
});

const cors = require("cors");
// const corsOptions = {
//   origin: "http://localhost:3000",
//   optionsSuccessStatus: 200,
// };

app.use(cors());

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

