const id = require("shortid")
const Query = require("../models/Query")

exports.createQuery = async (req, res) => {
    try {
      const { name , phone , query } = req.body;
      res.json(await new Query({ name, phone , query , loginId:id.generate() }).save());
    } catch (err) {
      // console.log(err);
      res.status(400).send("Creating Your Query Failed");
    }
  };


exports.getQueries = async (req,res)=>
  res.json(await Query.find({}).sort({ createdAt: -1 }).exec());
