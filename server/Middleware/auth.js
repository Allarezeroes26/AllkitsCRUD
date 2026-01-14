const jwt = require('jsonwebtoken')

const authUser = async (req, res, next) => {
    try {
        const token = req.headers.token;

        if (!token) {
            return res.status(401).json({success: false, message: "Not Authorized, Login Again"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.userId = decoded.id

        next()
    } catch (err) {
        console.error(err);
        res.status(401).json({
            success: false,
            message: "Invalid or Expired Token"
        })
    }
}

module.exports = authUser
