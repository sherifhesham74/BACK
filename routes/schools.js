const express=require("express");
const router=express.Router();
const schoolsModel=require("../models/schools")
router.use(express.json());
const upload=require("../middleware/multer");


function checkError(err, response){
    if(!err) return res.json(response);
        res.json(err)
}

router.get("/",async(req,res)=>{
    try {
        const posts=await schoolsModel.find()
        res.json(posts)
    } catch (error) {
        res.json(error)  
    }    
});

router.get("/:id",async (req,res)=>{
    try {
        const post=await schoolsModel.findById({_id:req.params.id})
        res.send(post)
    } catch (error) {
        res.json(error)
        
    }
});
router.post("/", upload.single("image"), async (req, res) => {
    const { file } = req;
    const newPost = await schoolsModel({
      image: file.filename,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      id: req.body.id,
      location: req.body.location,
      price: req.body.price,
      desc:req.body.desc
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
//     const newPost=await schoolsModel(req.body);
//     try {
//         newPost.save();
//         res.json(newPost);
//     } catch (error) {
//         res.json(error);   
//     }
// });

router.put("/:id",async(req,res)=>{
try {
    const updatedPost=await schoolsModel.updateOne({_id:req.params.id},req.body,)
    res.json(updatedPost);
} catch (error) {
    res.json(error);
}    

})

router.delete("/:id",async (req,res)=>{
try {
    const deletedPost=await schoolsModel.deleteOne({_id:req.params.id})
    res.json(deletedPost);
} catch (error) {
    res.json(error);
}
})
module.exports=router;
