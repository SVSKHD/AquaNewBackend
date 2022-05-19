const express = require("express")
const Server = express.Router()
const {create , list , update , deleteReview} = require("../controllers/review")

Server
.post("/review" , create)
.get("/allreviews" , list)
.put("/review/:slug" , update)
.delete("/review:slug" , deleteReview)


module.exports = Server
