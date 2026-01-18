const productModel = require('../Models/productModel');
const cloudinary = require('cloudinary').v2;


const addProduct = async (req, res) => {
    try {
        const { title, description, price, category, sizes } = req.body

        if (!title || !description || !price || !category) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            })
        }

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'At least one image is required'
            })
        }

        const image1 = req.files?.image1?.[0]
        const image2 = req.files?.image2?.[0]
        const image3 = req.files?.image3?.[0]
        const image4 = req.files?.image4?.[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        const normalizedCategory = category.toLowerCase()

        let parsedSizes = []

        if (normalizedCategory === "men's clothing" || normalizedCategory === "women's clothing") {
            if (!sizes) {
                return res.status(400).json({
                    success: false,
                    message: 'Sizes are required for clothing products'
                })
            }

            try {
                parsedSizes = Array.isArray(sizes) ? sizes : JSON.parse(sizes)
            } catch (err) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid sizes format'
                })
            }

            if (!Array.isArray(parsedSizes) || parsedSizes.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Sizes must be a non-empty array'
                })
            }
        } else if (
            normalizedCategory === 'jewelery' ||
            normalizedCategory === 'electronics'
        ) {
            parsedSizes = []
        } else {
            return res.status(400).json({
                success: false,
                message: 'Invalid category'
            })
        }

        const imageUrls = await Promise.all(
            images.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'products',
                    resource_type: 'image'
                })
                return result.secure_url
            })
        )

        const product = {
            title,
            description,
            price: Number(price),
            category: normalizedCategory,
            sizes: parsedSizes,
            images: imageUrls,
            date: Date.now()
        }

        const productDB = new productModel(product)
        await productDB.save()

        return res.status(201).json({
            success: true,
            message: 'Product added successfully',
            product
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: err.message || 'Server error'
        })
    }
}

const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.json({success: true, products})
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: err.message || 'Server Error'
        })
    }
}

const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: 'Product removed' })
    } catch (err) {
        console.error(err)
        return res.status(500).json({success: false, message: err.message || 'Server Error'})
    }
}

const singleProduct = async (req, res) => {
    try {
        const { id } = req.body
        const product = await productModel.findById(id)
        res.json({success: true, product})

    } catch (err) {
        console.error(err)
        res.status(500).json({success: false, message: err.message})
    }
}

module.exports = {addProduct, listProduct, removeProduct, singleProduct}
