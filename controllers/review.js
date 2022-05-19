const Review = require("../models/review")
const Slugify = require("slugify")

exports.create = async (req, res) => {
    try {
        req.body.slug = Slugify(req.body.title)
        const review = await new Review(req.body).save()
        res.json(review)
    } catch (error) {
        res.status(400).json({
            err: err.message,
        });
    }
}
exports.list = async (req, res) => {
    try {
        const data = await Review.find({})
        res.json(data)
    } catch (error) {
        res.status(400).json({ err: err, message })
    }
}
exports.update = async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const updated = await Review.findOneAndUpdate(
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

exports.deleteReview = async(req, res) => {
    try {
        const deleted = await Review.findOneAndDelete({
            title: req.params.title
        })
        res.json(deleted)
    } catch (err) {
        return res.status(400).send("deleting Blog failed")
    }
}
