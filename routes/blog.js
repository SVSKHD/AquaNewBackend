const express = require("express")
const server = express.Router()

const {authCheck , adminCheck} = require("../middlewares/auth")
const {create , getall , update , filters , listRelated , blogdelete} = require("../controllers/blog")



// createblog
server.post("/blog/create" , create)
//allblogs
server.get("/allblogs", getall )
//filters
server.post("/blog/filter" , filters)
//listrelated
server.get("/blog/related", listRelated)
//updateblog
server.put("/blog/update/:title" , update)
//deleteblog
server.delete("/blog/:title" , blogdelete)





module.exports = server