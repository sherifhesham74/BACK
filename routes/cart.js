const express = require("express");
const router = express.Router();
const cartModel = require("../models/cart");
router.use(express.json());
const upload = require("../middleware/multer");

function checkError(err, response) {
  if (!err) return res.json(response);
  res.json(err);
}

router.get("/", async (req, res) => {
  try {
    const posts = await cartModel.find();
    res.json(posts);
  } catch (error) {
    res.json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await cartModel.findById({ _id: req.params.id });
    res.send(post);
  } catch (error) {
    res.json(error);
  }
});

router.post("/", async (req, res) => {
  //   const images = files.map((e) => e.filename);
  const newPost = await cartModel({
    image: req.body.image,
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
    color: req.body.color,
    desc: req.body.desc,
    isExternal: req.body.isExternal,
  });
  try {
    newPost.save();
    res.json({
      newPost,
      files: files,
      path: files.originalname,
    });
  } catch (error) {
    res.json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await cartModel.deleteOne({ _id: req.params.id });
    res.json(deletedPost);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
