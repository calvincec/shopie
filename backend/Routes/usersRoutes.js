const {Router} = require('express');
const { registerUser, getUserDetails, loginUser, initiatePasswordReset, resetPassword, getAllCustomers, updateProfile, deactivateAccount} = require('../Controllers/usersController');
const {validateRegistration, validateLogin, validateResetPassword} = require("../Middleware/script");

const userRouter = Router();


userRouter.post('/register', validateRegistration, registerUser)
userRouter.get('/:userID', getUserDetails)
userRouter.post('/login', validateLogin, loginUser)
userRouter.post('/password-reset-request', validateResetPassword, initiatePasswordReset)
userRouter.post('/reset-password',resetPassword)
userRouter.get('/customers/get-all-customers', getAllCustomers)
userRouter.patch("/update-information/:UserID", updateProfile)
userRouter.post("/disable-account/:UserID", deactivateAccount)
module.exports = {
    userRouter
}