const express = require("express");
const server = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
  create,
  read,
  update,
  remove,
  list,
} = require("../controllers/blogcategory");

// routes

server.post("/blogcategory" , authCheck , adminCheck , create)
server.get("/blogcategories" , list)
server.get("/blogcategory/:slug", read);
server.put("/blogcategory/:slug" , authCheck , adminCheck , update)
server.delete("/blogcategory/:slug" , authCheck , adminCheck , remove)

module.exports = server;
