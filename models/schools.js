const mongoose=require("mongoose");

const schoolsSchema=new mongoose.Schema({
    image:String,
    id:Number,
    name:String,
    location:String,
    phone:Number,
    price:Number,
    email:String,
    desc:String
})

schoolsModel=new mongoose.model("schools",schoolsSchema)
module.exports = schoolsModel;