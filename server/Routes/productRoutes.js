const express = require('express')
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

router.get('/:id', async (req, res) => {
    try {
        const id = req.params
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        const data = await response.json()
        res.json(data)
    } catch (err) {
        res.status(500).json({Message: "Error getting product"})
    }
})

module.exports = router