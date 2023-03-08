const express=require("express");
const router=express.Router();
const carsnewModel=require("../models/carsnew")
router.use(express.json());
const upload=require("../middleware/multer");

function checkError(err, response){
    if(!err) return res.json(response);
        res.json(err)
}

router.get("/",async(req,res)=>{
    try {
        const posts=await carsnewModel.find().populate("owner")
        res.json(posts)
    } catch (error) {
        res.json(error)  
    }    
});

router.get("/:id",async (req,res)=>{
    try {
        const post=await carsnewModel.findById({_id:req.params.id}).populate("owner")
        res.json(post)
    } catch (error) {
        res.json(error)
        
    }
});
router.post("/", upload.array("image",12), async (req, res) => {
    const { files } = req;
    const  images = files.map(e => 
      e.filename 
    );
    const newPost = await carsnewModel({
      image: images,
      id: req.body.id,
      name: req.body.name,
      model: req.body.model,
      price: req.body.price,
      transmission: req.body.transmission,
      motor: req.body.motor,
      color: req.body.color,
      year: req.body.year,
      shopName: req.body.shopName,
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
//     const newPost=await carsnewModel(req.body);
//     try {
//         newPost.save();
//         res.json(newPost);
//     } catch (error) {
//         res.json(error);   
//     }
// });

router.put("/:id",async(req,res)=>{
try {
    const updatedPost=await carsnewModel.updateOne({_id:req.params.id},req.body,)
    res.json(updatedPost);
} catch (error) {
    res.json(error);
}    

})

router.delete("/:id",async (req,res)=>{
try {
    const deletedPost=await carsnewModel.deleteOne({_id:req.params.id})
    res.json(deletedPost);
} catch (error) {
    res.json(error);
}
})
module.exports=router;
