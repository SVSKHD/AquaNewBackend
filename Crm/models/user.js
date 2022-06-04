const mongoose = require("mongoose")
const schema = mongoose.schema
const bcrypt = require("bcrypt-nodejs")
const e = require("cors")


const UserSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
    }
})

UserSchema.pre('save', (next)=>{
    let user = this
    if(this.isModified('password') || this.isNew){
        bcrypt.genSalt(10,(err,salt)=>{
            if(err){
                return next(err)
            }
            bcrypt.hash(user.password , salt , null , (err,hash)=>{
                if(err){
                    return next(err)
                }
                user.password = hash
                next()
            })
        })
    }else{
        return next()
    }
})

module.exports = mongoose.model("User" , UserSchema)
