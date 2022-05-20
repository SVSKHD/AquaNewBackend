const express = require("express")
const server = express.Router()

const {createQuery , getQueries} = require("../controllers/Query")
const { authCheck, adminCheck } = require("../middlewares/auth");


server.post("/query", createQuery)
server.get("/queries"  , getQueries )

module.exports = server