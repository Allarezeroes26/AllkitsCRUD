const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], required: true },
    category: { type: String, required: true },
    sizes: { type: [String], default: [] },
    date: { type: Number, required: true },
})

const productModel = mongoose.models.product || mongoose.model("product", productSchema)


module.exports = productModel;