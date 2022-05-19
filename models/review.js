const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    name: { type: String },
    title: { type: String },
    description: { type: String },
    slug:{type:String},
    product: { type: String },
    stars: { type: Number },
}, { timestamps: true })

module.exports = mongoose.model("Review" , reviewSchema)