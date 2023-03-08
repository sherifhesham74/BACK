const express = require("express");
const router = express.Router();
const accessModel = require("../models/accessories");
router.use(express.json());
const upload = require("../middleware/multer");

function checkError(err, response) {
  if (!err) return res.json(response);
  res.json(err);
}

router.get("/", async (req, res) => {
  try {
    const posts = await accessModel.find().populate("owner");
    res.json(posts);
  } catch (error) {
    res.json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await accessModel
      .findById({ _id: req.params.id })
      .populate("owner");
    res.json(post);
  } catch (error) {
    res.json(post);
  }
});
router.post("/", upload.single("image"), async (req, res) => {
  const { file } = req;

  const newPost = await accessModel({
    image: file.filename,
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
    });
  } catch (error) {
    res.json(error);
  }
});

// router.post("/",async(req,res)=>{
//     const newPost=await accessModel(req.body);
//     try {
//         newPost.save();
//         res.json(newPost);
//     } catch (error) {
//         res.json(error);
//     }
// });

router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await accessModel.updateOne(
      { _id: req.params.id },
      req.body
    );
    res.json(updatedPost);
  } catch (error) {
    res.json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await accessModel.deleteOne({ _id: req.params.id });
    res.json(deletedPost);
  } catch (error) {
    res.json(error);
  }
});
module.exports = router;
