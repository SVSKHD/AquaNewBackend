const Razorpay = require("razorpay")
const User = require("../models/user")
const Cart = require("../models/cart");
const Razor = require("../models/RazorOrder")
const Order = require("../models/order")
const id = require("shortid")
const Product = require("../models/product")


exports.rpay = async (req,res)=>{
    
  const user = await User.findOne({ email: req.user.email }).exec();

  let { products } = await Cart.findOne({ orderdBy: user._id }).exec();

  const RKEYS = new Razorpay({
    key_id: process.env.RKEY,
    key_secret: process.env.RSECRET,
});


  let newOrder = await new Order({
    products,
    orderdBy: user._id,
    userDetails:{ 
    id:user._id,
    name:user.name,
    email:user.email,
    phone:user.phone
    }
  }).save();
  
  const options = {
    amount: 50000, // amount in smallest currency unit
    currency: "INR",
    receipt: "receipt_order_74394",
  };
 

  // decrement quantity, increment sold
  let bulkOption = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id }, // IMPORTANT item.product
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  let updated = await Product.bulkWrite(bulkOption, {});
  console.log("PRODUCT QUANTITY-- AND SOLD++", updated);

  console.log("NEW ORDER SAVED", newOrder);

  res.json({ ok: true });
};



