const id = require("shortid");
const Vendor = require("../models/vendors");

exports.createVendor = async (req, res) => {
  const Month = new Date().getMonth();
  const day = new Date().getDate();
  const year = new Date().getFullYear();
  const todaysDate = `${day}/${Month}/${year}`;
  try {
    const { name, phone, email, type, product, date } = req.body;
    res.json(
      await new Vendor({
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
    res.status(400).send("Creating Your Crm Vendor Failed");
  }
};

exports.getVendors = async (req, res) => {
  let Vendors = await Vendor.find({})
    .limit(parseInt(req.params.count))
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(Vendors);
};

const handleName = async (req, res, query) => {
  const VendorName = await Vendor.find({ name: query }).exec();
  res.json(VendorName);
};
const handleEmail = async (req, res, query) => {
  const VendorEmail = await Vendor.find({ email: query }).exec();
  res.json(VendorEmail);
};

const handleProduct = async (req, res, query) => {
  const VendorProduct = await Vendor.find({ product: query }).exec();
  res.json(VendorProduct);
};

const handleType = async (req, res, query) => {
  const VendorType = await Vendor.find({ type: query }).exec();
  res.json(VendorType);
};

const handlePhone = async (req, res, query) => {
  const VendorPhone = await Vendor.find({ phone: query }).exec();
  res.json(VendorPhone);
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

exports.updateVendor = async (req, res) => {
  try {
    const { name, phone, email, type, product } = req.body;
    const updated = await Vendor.findOneAndUpdate(
      { name: req.params.name },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("Vendor UPDATE ERROR ----> ", err);
    // return res.status(400).send("Product update failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.deleteVendor = async (req, res) => {
  try {
    const deleted = await Vendor.findOneAndRemove({
      name: req.params.name,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.staus(400).send("Vendor delete failed");
  }
};
