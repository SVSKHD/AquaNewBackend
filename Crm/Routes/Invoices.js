const express = require("express")
const server = express.Router()
const {createInvoice , getInvoices , filters , deleteInvoice, updateInvoice} = require("../Controllers/invoice")

// createinvoice
server.post("/invoice" , createInvoice)
// getinvoice
server.get("/invoiceload" , getInvoices)
// invoicefilter
server.post("/invoicefilter" , filters)
// updateinvoice
server.put("/invoice/:name" , updateInvoice)
// deleteInvoice
server.delete("/invoice/:name" , deleteInvoice)






module.exports = server