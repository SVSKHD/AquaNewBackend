const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema 

const razorpay = new mongoose.Schema({
    products: [
        {
          product: {
            type: ObjectId,
            ref: "Product",
          },
          count: Number,
          color: String,
        },
      ],
      orderStatus: {
        type: String,
        default: "Not Processed",
        enum: [
          "Not Processed",
          "Cash On Delivery",
          "processing",
          "Dispatched",
          "Cancelled",
          "Completed",
        ],
      },
      intent:{

      },
    orderdBy: { type: ObjectId, ref: "User" },
},{timestamps:true})

module.exports = mongoose.model("Razor" , razorpay)