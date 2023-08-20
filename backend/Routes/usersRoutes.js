const {Router} = require('express');
const { registerUser, getUserDetails, loginUser, initiatePasswordReset, resetPassword, getAllCustomers} = require('../Controllers/usersController');

const userRouter = Router();


userRouter.post('/register', registerUser)
userRouter.get('/:userID', getUserDetails)
userRouter.post('/login', loginUser)
userRouter.post('/password-reset-request', initiatePasswordReset)
userRouter.post('/reset-password',resetPassword)
userRouter.get('/customers/get-all-customers', getAllCustomers)
module.exports = {
    userRouter
}