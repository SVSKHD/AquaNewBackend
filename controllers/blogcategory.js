const BlogCategory = require("../models/blogc");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    res.json(await new BlogCategory({ name, slug: slugify(name) }).save());
  } catch (err) {
    // console.log(err);
    res.status(400).send("Create Blog-Category failed");
  }
};

exports.list = async (req, res) =>
  res.json(await BlogCategory.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
  let category = await BlogCategory.findOne({ slug: req.params.slug }).exec();
  // res.json(category);
  // const Blogs = await Blog.find({ category }).populate("category").exec();

  res.json({
    category,
  });
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await BlogCategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Blog-Category update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await BlogCategory.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Blog-Category delete failed");
  }
};

exports.getSubs = (req, res) => {
  Sub.find({ parent: req.params._id }).exec((err, subs) => {
    if (err) console.log(err);
    res.json(subs);
  });
};
