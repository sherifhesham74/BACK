const mongoose = require("mongoose");

const accesssSchema = new mongoose.Schema({
  image: String,
  id: Number,
  name: String,
  price: Number,
  color: String,
  desc: String,
  isExternal: Boolean,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "AccessoriesShop" },
});

accessModel = new mongoose.model("accesss", accesssSchema);
module.exports = accessModel;
