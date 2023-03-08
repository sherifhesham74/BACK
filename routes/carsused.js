const express=require("express");
const router=express.Router();
const carsUsedModel=require("../models/carsused")
router.use(express.json());
const upload=require("../middleware/multer");

router.get("/",async(req,res)=>{
    try {
        const posts=await carsUsedModel.find().populate("owner")
        res.json(posts)
    } catch (error) {
        res.json(error)  
    }    
});

router.get("/:id",async (req,res)=>{
    try {
        const post=await carsUsedModel.findById({_id:req.params.id}).populate("owner")
        res.json(post)
    } catch (error) {
        res.json(post)
        
    }
});
router.post("/", upload.array("image",12), async (req, res) => {
    const { files } = req;
    const  images = files.map(e => 
      e.filename 
    );
    const newPost = await carsUsedModel({
      image: images,
      id: req.body.id,
      name: req.body.name,
      model: req.body.model,
      price: req.body.price,
      transmission: req.body.transmission,
      motor: req.body.motor,
      color: req.body.color,
      year: req.body.year,
      distance: req.body.distance,
      owner: req.body.owner
      
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

// router.post("/",async(req,res)=>{
//     const newPost=await carsUsedModel(req.body);
//     try {
//         newPost.save();
//         res.json(newPost);
//     } catch (error) {
//         res.json(error);   
//     }
// });

router.put("/:id",async(req,res)=>{
try {
    const updatedPost=await carsUsedModel.updateOne({_id:req.params.id},req.body,)
    res.json(updatedPost);
} catch (error) {
    res.json(error);
}    

})

router.delete("/:id",async (req,res)=>{
try {
    const deletedPost=await carsUsedModel.deleteOne({_id:req.params.id})
    res.json(deletedPost);
} catch (error) {
    res.json(error);
}
})
module.exports=router;
