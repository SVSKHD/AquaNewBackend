const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
      unique: true,
    },
    product: {
      type: String,
    },
    date: {
      type: String,
    },
    Id: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
