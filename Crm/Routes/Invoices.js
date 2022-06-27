const express = require("express");
const Server = express.Router();
const {
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getInvoices,
  sendIndividualInvoice
} = require("../Controllers/invoice");

//get
Server.get("/invoices", getInvoices);
//post
Server.post("/invoice-create", createInvoice);

//put
Server.put("/invoice-update", updateInvoice);

//delete

Server.delete("/invoice-delete/:name", deleteInvoice);

//search
Server.get("/individualinvoice/:name" , sendIndividualInvoice)

module.exports = Server;
