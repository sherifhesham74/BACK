// const carsShops = require("../models/cars_shop");
// const jwt = require("jsonwebtoken");

// // handle errors
// const handleErrors = (err) => {
//   console.log(err.message, err.code);
//   let errors = { email: "", password: "" };

//   //incorrect email
//   if (err.message === "incorrect email") {
//     errors.email = "that email is not registered";
//   }

//   //incorrect password
//   if (err.message === "incorrect password") {
//     errors.password = "that password is incorrect";
//   }

//   // duplicate email error
//   if (err.code === 11000) {
//     errors.email = "that email is already registered";
//     return errors;
//   }

//   // validation errors
//   if (err.message.includes("carsShop validation failed")) {
//     // console.log(err);
//     Object.values(err.errors).forEach(({ properties }) => {
//       // console.log(val);
//       // console.log(properties);
//       errors[properties.path] = properties.message;
//     });
//   }

//   return errors;
// };

// // create json web token
// const maxAge = 3 * 24 * 60 * 60;
// const createToken = (id) => {
//   return jwt.sign({ id }, "kalaks secret", {
//     expiresIn: maxAge,
//   });
// };

// // controller actions
// module.exports.signup_get = (req, res) => {
//   res.json("signup");
// };

// module.exports.login_get = (req, res) => {
//   res.json("login");
// };

// module.exports.signup_post = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const carsShop = await carsShops.create({ email, password });
//     const token = createToken(carsShop._id);
//     res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
//     res.status(201).json({ carsShop: carsShop._id });
//   } catch (err) {
//     const errors = handleErrors(err);
//     res.status(400).json({ errors });
//   }
// };

// module.exports.login_post = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const carsShop = await carsShops.login(email, password);
//       const token = createToken(carsShop._id);
//         res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
//     res.status(200).json({ carsShop: carsShop._id });
//   } catch (err) {
//     const errors = handleErrors(err);
//     res.status(400).json({ errors });
//   }
// };

// // logout action
// module.exports.logout_get=(req,res)=>{
//   res.cookie('jwt','',{maxAge:1});
//   res.redirect('/');
// }


const CarsShop = require("../models/cars_shop");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login a carsShop
const loginCarsShop = async (req, res) => {
  const { email, password } = req.body;
  try {
    const carsShop = await CarsShop.login(email, password);
    // create a token
    const token = createToken(carsShop._id);
    res.status(200).json({email: email,token: token,id: carsShop._id });
  } catch (error) {
    res.json({ error: error.message });
  }
};

// signup a carsShop
const signupCarsShop = async (req, res) => {
 
  const { email, password } = req.body;
  try {
    const carsShop = await CarsShop.signup(email, password);
    // create a token
    const token = createToken(carsShop._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = { signupCarsShop, loginCarsShop };