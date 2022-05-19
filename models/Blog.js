const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        maxlength:250,
    },
    subtitle:{
        type:String,
        maxlength:250
    },
    slug:{
       type:String,
       required:true
    },
    keywords:{
      type:[],
      maxlength:300
    },
    description:{
       type:String,
       maxlength:5000
    },
    specs:{
      type:String,
      maxlength:3000,
    },
    price:{
      type:Number,
    },
    suggestion:{
       type:"String" 
    },
    link:{
        type:String,
    },
    featuredImage:{
        type:Array,
    },
    product:{
       type:ObjectId,
       ref:"Product"
    },
    pros:{
       type:String,
    },
    blogcategory:{
      type:ObjectId,
      ref:"BlogCategory"
    },
},{timestamps:true})

module.exports = mongoose.model("Blog" , blogSchema)