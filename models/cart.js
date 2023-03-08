const mongoose = require("mongoose");
const cartschema = new mongoose.Schema({
  image: String,
  id: Number,
  name: String,
  price: Number,
  color: String,
  desc: String,
  isExternal: Boolean,
});
cartModel = new mongoose.model("cart", cartschema);
module.exports = cartModel;
