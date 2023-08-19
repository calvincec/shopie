const {Router} = require('express');
const { registerUser, getUserDetails} = require('../Controllers/usersController');

const userRouter = Router();


userRouter.post('/register', registerUser)
userRouter.get('/:userID', getUserDetails)

module.exports = {
    userRouter
}