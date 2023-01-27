const userController = require('../controllers/userController')
const userRouter = require('express').Router()

userRouter.route("/register").post(userController.register)
userRouter.route("/login").post(userController.login)

module.exports = userRouter;