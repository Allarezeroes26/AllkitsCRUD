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

}

const placeOrderPaypal = async (req, res) => {
    
}

// All orders data for Admin
const allOrders = async (req, res) => {

}

const userOrders = async (req, res) => {

}

const updateStatus = async (req, res) => {

}

module.exports = { placeOrder, placeOrderGCash, placeOrderPaypal, allOrders, userOrders, updateStatus }