const {Router} = require('express');
const { registerUser, getUserDetails, loginUser, initiatePasswordReset, resetPassword, getAllCustomers} = require('../Controllers/usersController');
const {validateRegistration, validateLogin, validateResetPassword} = require("../Middleware/script");

const userRouter = Router();


userRouter.post('/register', validateRegistration, registerUser)
userRouter.get('/:userID', getUserDetails)
userRouter.post('/login', validateLogin, loginUser)
userRouter.post('/password-reset-request', validateResetPassword, initiatePasswordReset)
userRouter.post('/reset-password',resetPassword)
userRouter.get('/customers/get-all-customers', getAllCustomers)
module.exports = {
    userRouter
}