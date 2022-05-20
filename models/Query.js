const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema;


const querySchema = mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    phone:{
        type:Number,
        unique:true
    },
    query:{
        type:String
    },
    loginId:{
        type:String
    }
})

module.exports = mongoose.model("Query" , querySchema)