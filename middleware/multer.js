
const multer=require('multer')

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images')
    },
    filename:(req,file,cb)=>{
        const fileName = `${Date.now()}_${file.originalname}`;  
        cb(null,fileName)
    }    
})

const upload=multer({storage:storage})
module.exports=upload