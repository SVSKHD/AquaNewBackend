const express = require("express")
const Server = express.Router()
const crmUser = require("../models/user")
const {Signup , Login} = require("../Controllers/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");



Server.post("/signup", Signup)
  
  Server.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!(email && password)) {
        res.status(400).send("Field is missing");
      }
  
      const user = await User.findOne({ email });
  
      // if(!user){
      //   res.status(400).send("You are not registered in our app")
      // }
  
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.SECRET_KEY,
          {
            expiresIn: "2h",
          }
        );
        user.token = token;
        user.password = undefined;
        // res.status(200).json(user);
  
        // if you want to use cookies
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
  
        res.status(200).cookie("token", token, options).json({
          success: true,
          token,
          user,
        });
      }
  
      res.sendStatus(400).send("email or password is incorrect");
    } catch (error) {
      console.log(error);
    }
  });
Server.get("/signupwork",(req,res)=>{
    res.json({"msg":"Working"})
})

module.exports = Server