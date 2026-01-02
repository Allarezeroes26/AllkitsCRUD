const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()

const productRoutes = require('./Routes/productRoutes')

const app = express()

const port = process.env.PORT || 5001

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
}))

app.use('/api/products', productRoutes)

app.listen(port, () => {
    console.log(`Server running in http://localhost:${port}`)
})