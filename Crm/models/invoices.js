const mongoose = require("mongoose");

const invoiceSchema = mongoose.Schema(
  {
    invoiceSerialNo:{
     type:String
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: Number,
      unique: true,
    },
    //gst status
    gst: {
      type: Boolean,
      default: false,
    },
    gstName: {
      type: String,
      default: false,
    },
    gstPhone: {
      type: Number,
      default: false,
    },
    gstNo: {
      type: String,
      default: false,
    },
    gstAddress: {
      type: String,
      default: false,
    },

    //product details
    productName: {
      type: String,
    },
    productQuantity: {
      type: Number,
    },
    productPrice: {
      type: Number,
    },
    productSerialNo: {
      type: String,
    },
    //paymentdetails
    paymentType: {
      type: String,
    },
    paymentDetails: {
      type: String,
    },
    paidAmount: {
      type: Number,
    },
    deliveredBy: {
      type: String,
    },
    deliveryStatus: {
      type: String,
    },
    date:{
      type:String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
