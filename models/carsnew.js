const mongoose=require("mongoose");

const carsnewSchema=new mongoose.Schema({
    image: Array,
    id:Number,
    name:String,
    model:String,
    price:Number,
    transmission:String,
    motor:Number,
    color:String,
    year:Number,
    shopName:String,
    owner:{type:mongoose.Schema.Types.ObjectId , ref:"CarsShop"}
})

carsnewModel=new mongoose.model("carsnew",carsnewSchema)
module.exports = carsnewModel;