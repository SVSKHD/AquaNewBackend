const User = require("../models/user")
const jwt = require("jsonwebtoken")

exports.Signup = async(req,res)=>{
    if(req.body.email || req.body.password){
        res.json({message:"Please Enter email or password"})
    }else{
        try {
            let newUser = new User()
            newUser.name = req.body.name
            newUser.email = req.body.email
            newUser.password = req.body.password
            await newUser.save()
            let token = jwt.sign(newUser.toJSON(), process.env.SECRET,{expiresIn:604800})
            res.json({
                success:true,
                token:token,
                message:'Succesfully Created a new user'
            })
        } catch (error) {
            res.json({
                success:false,
                message:'Please try again'
            })
        }
    }
}