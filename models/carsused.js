const mongoose=require("mongoose");

const carsUsedSchema=new mongoose.Schema({
    image:Array,
    id:Number,
    name:String,
    model:String,
    price:Number,
    transmission:String, 
    motor:Number,
    color:String,
    year:Number,
    distance:Number,


    owner:{type:mongoose.Schema.Types.ObjectId , ref:"CarsShop"}
})

carsUsedModel=new mongoose.model("carsused",carsUsedSchema)
module.exports = carsUsedModel;