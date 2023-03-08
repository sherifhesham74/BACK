const express=require("express");
const router=express.Router();
const adminModel=require("../models/admin")
router.use(express.json());
// controller functions
const { loginAdmin, signupAdmin } = require('../controllers/adminAuth')


function checkError(err, response){
    if(!err) return res.json(response);
        res.json(err)
}

router.get("/",async(req,res)=>{
    try {
        // const posts=await adminModel.find().populate("author")
        const posts=await adminModel.find()
        res.json(posts)
    } catch (error) {
        res.json(error)  
    }    
});

router.get("/:id",async (req,res)=>{
    try {
        // const post=await adminModel.findById({_id:req.params.id}).populate("author")
        const post=await adminModel.findById({_id:req.params.id})
        res.json(post)
    } catch (error) {
        res.json(error);
        
    }
});

router.post("/",async(req,res)=>{
    const newPost=await adminModel(req.body);
    try {
        newPost.save();
        res.json(newPost);
    } catch (error) {
        res.json(error);   
    }
});

router.put("/:id",async(req,res)=>{
try {
    const updatedPost=await adminModel.updateOne({_id:req.params.id},req.body,)
    res.json(updatedPost);
} catch (error) {
    res.json(error);
}    

})

router.delete("/:id",async (req,res)=>{
try {
    const deletedPost=await adminModel.deleteOne({_id:req.params.id})
    res.json(deletedPost);
} catch (error) {
    res.json(error);
}
})



// login route
router.post('/login', loginAdmin)

// signup route
router.post('/signup', signupAdmin)


module.exports=router;