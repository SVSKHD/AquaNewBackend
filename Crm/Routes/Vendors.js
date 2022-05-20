const express = require("express");
const server = express.Router();

const {
  createVendor,
  getVendors,
  filters,
  updateVendor,
  deleteVendor,
} = require("../Controllers/vendors");

// post
server.post("/vendors" , createVendor);
// getall
server.get("/allvendors" , getVendors);
// updatevendors
server.put("/vendor/:name" , updateVendor);
// filter
server.post("/vendors/filter" , filters);
// deletevendors
server.delete("/vendors/:name" , deleteVendor);

module.exports = server;
