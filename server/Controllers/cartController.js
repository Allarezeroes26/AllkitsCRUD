const userModel = require("../Models/userModel");

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware
    const { productId, size = "default" } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!user.cartData) user.cartData = {};
    if (!user.cartData[productId]) user.cartData[productId] = {};

    const productCart = user.cartData[productId];

    // Increment quantity or set to 1
    if (productCart[size]) {
      productCart[size] += 1;
    } else {
      productCart[size] = 1;
    }

    user.markModified("cartData");
    await user.save();

    res.json({ success: true, message: "Added to Cart!", cartData: user.cartData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update item quantity in cart
const updateCart = async (req, res) => {
  try {
    const userId = req.userId; // auth middleware
    const { productId, size = "default", quantity } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!user.cartData) user.cartData = {};
    if (!user.cartData[productId]) user.cartData[productId] = {};

    if (quantity === 0) {
      delete user.cartData[productId][size];

      // Remove product if no sizes left
      if (Object.keys(user.cartData[productId]).length === 0) {
        delete user.cartData[productId];
      }
    } else {
      user.cartData[productId][size] = quantity;
    }

    user.markModified("cartData");
    await user.save();

    res.json({ success: true, message: "Cart Updated!", cartData: user.cartData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get user's cart
const getUserCart = async (req, res) => {
  try {
    const userId = req.userId; // auth middleware

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!user.cartData) user.cartData = {};

    res.json({ success: true, cartData: user.cartData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { addToCart, updateCart, getUserCart };
