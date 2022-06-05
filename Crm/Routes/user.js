const express = require("express")
const Server = express.Router()
const {Signup , Login} = require("../Controllers/user")



Server.post("/signup", Signup)
  
Server.post("/login", Login)

Server.get("/signupwork",(req,res)=>{
    res.json({"msg":"Working"})
})

module.exports = Server