const express = require('express')
const { addProduct, listProduct, removeProduct, singleProduct } = require('../Controllers/productController')
const upload = require('../Middleware/multer')
const adminAuth = require('../Middleware/adminAuth')
const router = express.Router()

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
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        const data = await response.json()
        res.json(data)
    } catch (err) {
        res.status(500).json({Message: "Error getting product"})
    }
})

module.exports = router