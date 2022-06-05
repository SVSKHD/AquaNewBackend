const crmUser = require("../models/user")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

exports.Signup =  async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      if (!(email && password && name)) {
        res.status(400).send("All fields are required");
      }
  
      const existingUser = await crmUser.findOne({ email }); // PROMISE
  
      if (existingUser) {
        res.status(401).send("User already exists");
      }
  
      const myEncPassword = await bcrypt.hash(password, 10);
  
      const user = await crmUser.create({
        name,
        email: email.toLowerCase(),
        password: myEncPassword,
      });
  
      //token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.SECRET_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      //update or not in DB
  
      // handle password situation
      user.password = undefined;
  
      // send token or send just success yes and redirect - choice
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
    }
  }

exports.Login = async (req, res) => {
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
  }