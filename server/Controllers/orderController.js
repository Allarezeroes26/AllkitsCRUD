const orderModel = require('../Models/orderModel');
const userModel = require('../Models/userModel');

const placeOrder = async (req, res) => {
    try {
        const userId = req.userId;
        const { items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            status: "Order Placed",
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId, {cartData: {}})

        res.json({ success: true, message: "Order Placed" })

    } catch (err) {
        console.log(err)
        res.json({success: false, message: err.message})
    }
}

const placeOrderGCash = async (req, res) => {
    try {
        const userId = req.userId
        const { items, amount, address } = req.body

        const paymentSuccess = Math.random() > 0.2

        if(!paymentSuccess) {
            return res.json({
                success: false,
                message: 'GCash payment failed'
            })
        }

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "GCash",
            payment: true,
            status: "Paid",
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({success: true, message: "GCash Payment Successfull"})

    } catch (err) {
        console.error(err)
        res.json({success: false, message: err.message})
    }
}

const placeOrderPaypal = async (req, res) => {
    try {
        const userId = req.userId
        const { items, amount, address } = req.body

        const paymentSuccess = Math.random() > 0.2

        if(!paymentSuccess) {
            return res.json({
                success: false,
                message: 'Paypal payment failed'
            })
        }

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Paypal",
            payment: true,
            status: "Paid",
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({success: true, message: "Paypal Payment Successfull"})

    } catch (err) {
        console.error(err)
        res.json({success: false, message: err.message})
    }
}

// All orders data for Admin
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success: true, orders})
    } catch (err) {
        console.log(err)
        res.json({ success:false, message:err.message })
    }
}

const userOrders = async (req, res) => {
    try {
        const userId = req.userId
        const orders = await orderModel.find({userId})
        res.json({success: true, orders})
    } catch (err) {
        console.error(err)
        res.json({ success: false, message: err.message })
    }
}

const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success: true, message: 'Status Updated'})
    } catch (err) {
        console.error(err)
        res.json({ success: false, message: err.message })
    }
}

module.exports = { placeOrder, placeOrderGCash, placeOrderPaypal, allOrders, userOrders, updateStatus }