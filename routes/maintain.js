const express = require("express");
const router = express.Router();
const maintainModel = require("../models/maintain");
router.use(express.json());
const upload = require("../middleware/multer");

function checkError(err, response) {
  if (!err) return res.json(response);
  res.json(err);
}

router.get("/", async (req, res) => {
  try {
    const posts = await maintainModel.find();
    res.json(posts);
  } catch (error) {
    res.json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await maintainModel.findById({ _id: req.params.id });
    res.send(post);
  } catch (error) {
    res.json(error);
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  const { file } = req;
  const newPost = await maintainModel({
    image: file.filename,
    id: req.body.id,
    name: req.body.name,
    location: req.body.location,
    phone: req.body.phone,
    price: req.body.price,
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
// router.post("/",async(req,res)=>{
//     const newPost=await maintainModel(req.body);
//     try {
//         newPost.save();
//         res.json(newPost);
//     } catch (error) {
//         res.json(error);
//     }
// });

router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await maintainModel.updateOne(
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
    const deletedPost = await maintainModel.deleteOne({ _id: req.params.id });
    res.json(deletedPost);
  } catch (error) {
    res.json(error);
  }
});
module.exports = router;
