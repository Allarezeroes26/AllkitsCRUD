const express = require('express')
const userRouter = express.Router()
const {loginUser, registerUser, adminLogin} = require('../Controllers/userController')

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)

module.exports = userRouter;