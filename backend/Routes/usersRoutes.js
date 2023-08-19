const {Router} = require('express');
const { registerUser } = require('../Controllers/usersController');

const userRouter = Router();


userRouter.post('/register', registerUser)


module.exports = {
    userRouter
}