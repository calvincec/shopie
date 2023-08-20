const {Router} = require('express');
const { registerUser, getUserDetails, loginUser} = require('../Controllers/usersController');

const userRouter = Router();


userRouter.post('/register', registerUser)
userRouter.get('/:userID', getUserDetails)
userRouter.post('/login', loginUser)
module.exports = {
    userRouter
}