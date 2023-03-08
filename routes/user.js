const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
router.use(express.json());
const upload = require("../middleware/multer");
// const userAuth = require("../controllers/userAuth");
// controller functions
const { loginUser, signupUser } = require("../controllers/userAuth");

router.get("/", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.params.id });
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  const { file } = req;
  const newPost = await userModel({
    image: file.filename,
    fname: req.body.fname,
    lname: req.body.lname,
    phone: req.body.phone,
    email: req.body.email,
  });
  try {
    newPost.save();
    res.json({
      newPost,
      file: file,
      path: file.originalname,
    });
  } catch (error) {
    res.json(error);
  }
});

// router.post("/",async (req,res)=>{
//     const newUser=userModel(req.body);
// try {
//     newUser.save()
//     res.json({sucsseful_inserted:newUser})
// } catch (error) {
//     res.json(error);
// }
// });

router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await userModel.updateOne(
      { _id: req.params.id },
      req.body
    );
    res.send("changes saved ...");
  } catch (error) {
    res.json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await userModel.deleteOne({ _id: req.params.id });
    res.json(deletedUser);
  } catch (error) {
    res.json(error);
  }
});

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

module.exports = router;
