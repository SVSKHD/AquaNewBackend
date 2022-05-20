const express = require("express")
const { createContact , getContacts , deleteContact , filters, updateContact} = require("../Controllers/contact")
const server = express.Router()







// contact post
server.post("/contact" , createContact)
// getallcontacts
server.get("/contactload" , getContacts)
// contactbyfilters
server.post("/contactfilter" , filters)
// updatecontact
server.put("/contact/:name" , updateContact)
// deleteContact
server.delete("/contactdelete/:name",deleteContact)



module.exports = server