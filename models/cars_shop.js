const mongoose=require("mongoose");
const { any } = require("webidl-conversions");
const bcrypt = require("bcrypt");
const validator = require("validator");

const carshopSchema = new mongoose.Schema({
  image: Array,
  id: Number,
  name: String,
  location: String,
  phone: Number,
  start_Date: Number,
  description: String,
  facebook:String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});



// static signup method
carshopSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const carsShop = await this.create({ email, password: hash });

  return carsShop;
};

// static login method
carshopSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const carsShop = await this.findOne({ email });
  if (!carsShop) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, carsShop.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return carsShop;
};

carshopModel = new mongoose.model("CarsShop", carshopSchema);
module.exports = carshopModel;