const Invoice = require("../models/invoices")
const id = require("shortid");


exports.createInvoice = async (req, res) => {
    const Months = ["jan" , "feb" , "mar" , "Aip" , "may" , "jun" , "jul" , "aug" , "sep" , "oct" , "nov" , "dec"]
    const Month = new Date().getMonth();
    const day = new Date().getDate();
    const year = new Date().getFullYear();
    const MonthName = Months[Month]
    const todaysDate = `${day}/${Months[Month]}/${year}`;
    try {
      const { name, phone, email, Type, address ,product, date , price , quantity ,serial ,  isAquakartUser , aquakartuser } = req.body;
      res.json(
        await new Invoice({
          name,
          phone,
          address,
          email,
          Type,
          product,
          price,
          quantity,
          isAquakartUser:false,
          aquakartuser,
          serial,
          date: todaysDate,
          InvoiceNo:`${MonthName}-${id.generate()}`,
          Id: id.generate(),
        }).save()
      );
    } catch (err) {
      console.log(err);
      res.status(400).send("Creating Your Crm Invoice Failed");
    }
  };


  exports.getInvoices = async (req, res) => {
    let Invoices = await Invoice.find({})
      .limit(parseInt(req.params.count))
      .sort([["createdAt", "desc"]])
      .exec();
    res.json(Invoices);
  };


  
const handleName = async(req,res , query)=>{
    const InvoiceName = await Invoice.find({name:query}).exec();
    res.json(InvoiceName);
  }
  const handleEmail = async(req,res , query)=>{
    const InvoiceEmail = await Invoice.find({email:query}).exec();
    res.json(InvoiceEmail);
  }
  
  const handleProduct = async(req,res , query)=>{
    const InvoiceProduct = await Invoice.find({product:query}).exec();
    res.json(InvoiceProduct);
  }
  
  const handleType = async(req,res,query)=>{
    const InvoiceType = await Invoice.find({type:query}).exec();
    res.json(InvoiceType);
  }
  
  const handlePhone= async(req,res,query)=>{
    const InvoicePhone = await Invoice.find({phone:query}).exec();
    res.json(InvoicePhone);
  }

  const handlePrice = async(req,res,query)=>{
      const InvoicePrice = await Invoice.find({price:query}).exec()
      res.json(InvoicePrice)
  }
  
  
  exports.filters = async (req, res) => {
    const {
     name ,
     email,
     phone,
     type,
     product,
     price,
    }=req.body
  
    if (name) {
      await handleName(req, res, name);
    }
    if(email){
      await handleEmail(req,res,email)
    }
    if(product){
      await handleProduct(req,res,product)
    }
    if(phone){
      await handlePhone(req,res,phone)
    }
    if(type){
      await handleType(req,res,type)
    }
    if(price){
        await handlePrice(req,res,price)
    }
  };

  exports.updateInvoice = async (req, res) => {
    try {
      const { name, phone, email, Type, product , quantity , InvoiceNo , isAquakartUser} = req.body;
      const updated = await Invoice.findOneAndUpdate(
        { name: req.params.name },
        req.body,
        { new: true }
      ).exec();
      res.json(updated);
    } catch (err) {
      console.log("Contact UPDATE ERROR ----> ", err);
      // return res.status(400).send("Product update failed");
      res.status(400).json({
        err: err.message,
      });
    }
  };

  exports.deleteInvoice=async(req,res)=>{
    try {
        const deleted = await Invoice.findOneAndRemove({
          name : req.params.name,
        }).exec();
        res.json(deleted);
      } catch (err) {
        console.log(err);
        return res.staus(400).send("Invoice delete failed");
      }
  }