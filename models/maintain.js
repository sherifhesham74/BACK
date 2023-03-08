const mongoose=require("mongoose");

const maintainSchema=new mongoose.Schema({
    image:String,
    id:Number,
    name:String,
    location:String,
    phone:Number,
    price:Number,
})

maintainModel=new mongoose.model("maintain",maintainSchema)
module.exports = maintainModel;