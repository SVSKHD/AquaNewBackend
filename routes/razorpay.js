const express = require("express")
const server = express.Router()
const {rpay} = require("../controllers/razorpay")
// middleware
const { authCheck } = require("../middlewares/auth");

server.post("/razorpaycheck", authCheck ,rpay)






module.exports = server