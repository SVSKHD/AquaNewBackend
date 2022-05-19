const Blog = require("../models/Blog");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.subtitle);
    const newblog = await new Blog(req.body).save();
    res.json(newblog);
  } catch (error) {
    res.status(400).json({
      err: error.message,
    });
  }
};

exports.getall = async (req, res) => {
  let blogs = await Blog.find({})
    .limit(parseInt(req.params.count))
    .populate("products")
    .sort([["createdAt", "desc"]]);
  res.json(blogs);
};

exports.all = async (req, res) => {};

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (error) {
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.filters = async() =>{}

exports.categoryfetch=async()=>{}

exports.listRelated = async (req, res) => {
  const blog = await Blog.findById(req.params.blogId).exec();

  const related = await Blog.find({
    _id: { $ne: product._id },
    category: blog.blogcategory,
  })
    .limit(3)
    .populate("blogcategory")
    .populate("postedBy")
    .exec();

  res.json(related);
};

const handleCategory = async (req, res, category) => {
  try {
    let blogs = await Blogs.find({ blogcategory })
      .populate("blogcategory", "_id name")
      .populate("postedBy", "_id name")
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

const handleQuery = async (req, res, query) => {
  const products = await Blog.find({ $text: { $search: query } })
    .populate("blogcategory", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};


// deleteblog
exports.blogdelete = async(req,res)=>{
  try{
   const deleted = await Blog.findOneAndDelete({
     title:req.params.title
   })
   res.json(deleted)
  }catch(err){
    return res.status(400).send("deleting Blog failed")
  }
}
