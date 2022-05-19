const express = require("express")
const server = express.Router()


server.get("/contacts" )

server.post("/contact",) //should return unique id and with an email

server.delete("/contact/:contact")

module.exports = server