const express = require("express");
const Server = express.Router();
const {
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getInvoices,
} = require("../Controllers/invoice");

//get
Server.get("/invoices", getInvoices);
//post
Server.post("/invoice-create", createInvoice);

//put
Server.put("/invoice-update", updateInvoice);

//delete

Server.delete("/invoice-delete/:name", deleteInvoice);

module.exports = Server;
