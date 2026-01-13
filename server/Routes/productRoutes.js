const express = require('express')
const { addProduct, listProduct, removeProduct, singleProduct } = require('../Controllers/productController')
const upload = require('../Middleware/multer')
const adminAuth = require('../Middleware/adminAuth')
const router = express.Router()
const productModel = require('../Models/productModel')
const { default: mongoose } = require('mongoose')

router.get('/', async (req, res) => {
    try {
        const response = await fetch('https://fakestoreapi.com/products')
        const data = await response.json()
        const showcase = data.slice(0,1);
        res.json(data)
    } catch (err) {
        res.status(500).json({Message: 'Error fetching products'})
        console.error(err)
    }
})

router.post('/add', adminAuth ,upload.fields([{name: 'image1', maxCount:1}, {name: 'image2', maxCount:1}, {name: 'image3', maxCount:1}, {name: 'image4', maxCount:1},]), addProduct);
router.post('/remove', adminAuth, removeProduct);
router.post('/single', singleProduct);
router.get('/list', listProduct);


router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid product Id'
            })
        }

        const response = await productModel.findById(id)

        if (!response) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            product
        })
    } catch (err) {
        res.status(500).json({Message: "Error getting product"})
    }
})

module.exports = router