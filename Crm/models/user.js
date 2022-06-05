const mongoose = require("mongoose");

const CrmUserSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  userType:{
    type:String
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("crmUser", CrmUserSchema);
