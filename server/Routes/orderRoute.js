const express = require('express')
const { placeOrder, placeOrderGCash, placeOrderPaypal, allOrders, userOrders, updateStatus } = require('../Controllers/orderController')
const adminAuth = require('../Middleware/adminAuth')
const auth = require('../Middleware/auth')

const orderRouter = express.Router()

//Admin
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

//Payment
orderRouter.post('/place', auth, placeOrder)
orderRouter.post('/gcash', auth, placeOrderGCash)
orderRouter.post('/paypal', auth, placeOrderPaypal)

//User
orderRouter.post('/userorders', auth, userOrders)

module.exports = orderRouter;