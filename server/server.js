const express = require('express')
const cors = require('cors')

const productRoutes = require('./Routes/productRoutes')
const connectDB = require('./Config/mongodb')
const connectCloudinary = require('./Config/cloudinary')
const userRouter = require('./Routes/userRoute')
const cartRouter = require('./Routes/cartRoute')
const orderRouter = require('./Routes/orderRoute')

const app = express()

const port = process.env.PORT || 5001
connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())

app.use('/api/products', productRoutes)
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})