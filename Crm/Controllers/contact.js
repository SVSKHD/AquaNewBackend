const id = require("shortid");
const Contact = require("../models/contact");

exports.createContact = async (req, res) => {
  const Month = new Date().getMonth();
  const day = new Date().getDate();
  const year = new Date().getFullYear();
  const todaysDate = `${day}/${Month}/${year}`;
  try {
    const { name, phone, email, type, product, date } = req.body;
    res.json(
      await new Contact({
        name,
        phone,
        email,
        type,
        product,
        date: todaysDate,
        Id: id.generate(),
      }).save()
    );
  } catch (err) {
    console.log(err);
    res.status(400).send("Creating Your Crm Contact Failed");
  }
};

exports.getContacts = async (req, res) => {
  let contacts = await Contact.find({})
    .limit(parseInt(req.params.count))
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(contacts);
};

const handleName = async (req, res, query) => {
  const contactName = await Contact.find({ name: query }).exec();
  res.json(contactName);
};
const handleEmail = async (req, res, query) => {
  const contactEmail = await Contact.find({ email: query }).exec();
  res.json(contactEmail);
};

const handleProduct = async (req, res, query) => {
  const contactProduct = await Contact.find({ product: query }).exec();
  res.json(contactProduct);
};

const handleType = async (req, res, query) => {
  const contactType = await Contact.find({ type: query }).exec();
  res.json(contactType);
};

const handlePhone = async (req, res, query) => {
  const contactPhone = await Contact.find({ phone: query }).exec();
  res.json(contactPhone);
};

exports.filters = async (req, res) => {
  const { name, email, phone, type, product } = req.body;

  if (name) {
    await handleName(req, res, name);
  }
  if (email) {
    await handleEmail(req, res, email);
  }
  if (product) {
    await handleProduct(req, res, product);
  }
  if (phone) {
    await handlePhone(req, res, phone);
  }
  if (type) {
    await handleType(req, res, type);
  }
};

exports.updateContact = async (req, res) => {
  try {
    const { name, phone, email, type, product } = req.body;
    const updated = await Contact.findOneAndUpdate(
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

exports.deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.findOneAndRemove({
      name: req.params.name,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.staus(400).send("Contact delete failed");
  }
};
