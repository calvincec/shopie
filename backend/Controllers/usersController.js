const {v4} = require('uuid');
const {DB} = require('../Database/helpers');
const bcrypt = require('bcrypt')


const registerUser = async (req, res) => {
    try {
        const UserID = v4();
        console.log(req.body)
        const {UserName, Email, Password, PhoneNumber, isAdmin} = req.body
        console.log(UserName, Email, Password, PhoneNumber)
        const existingUser = await DB.exec('CheckIfUserExistsProcedure', {Email})
       
        if (existingUser.recordset.length > 0) {
            return res.status(409).json({
                message: "An account with this email exists. Please sign in instead"
            })
        }
        const hashedPassword = await bcrypt.hash(Password, 10)
        const result = await DB.exec('registerUsersProcedure', {
            UserID,
            UserName,
            Email,
            Password: hashedPassword,
            PhoneNumber,
            isAdmin
        })

        if (result.returnValue === 0) {
            console.log("User added succesfully");
            return res.status(201).json({
                message: `Account succesfully created.`
            })
        } else {
            return res.status(500).json({message: 'Registration failed'});

        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
        });
    }
}

module.exports = {
    registerUser
}