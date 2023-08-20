const {v4} = require('uuid');
const {DB} = require('../Database/helpers');
const bcrypt = require('bcrypt')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
const {sendMail} = require("../Database/helpers/email");
const { createUsersTable } = require('../Database/Tables/createTables');
dotenv.config()

const registerUser = async (req, res) => {
    try {
        createUsersTable()
        const UserID = v4();
        // console.log(req.body)
        const {UserName, Email, Password, PhoneNumber, isAdmin} = req.body
        // console.log(UserName, Email, Password, PhoneNumber)
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
            const userMessageOptions = {
                from: process.env.ADMIN_EMAIL,
                to: Email,
                subject: 'Account Registration',
                html: `
        <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px;">
            <div style="background-color: #ffffff; border-radius: 5px; padding: 20px; box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.45);">
                <h2 style="color: #333333;">Hello ${UserName},</h2>
                <p>Welcome to Shoppie!</p>
                <p>This is to inform you that your account has been successfully created.</p>
                <p>Welcome aboard!</p>
                <p>If you have any questions or need assistance, feel free to contact us.</p>
                <p>Best regards,</p>
                <p>The Shoppie Team</p>
            </div>
        </div>
    `,
            };

            await sendMail(userMessageOptions)
            return res.status(201).json({
                message: `Account succesfully created.`
            })
        } else {
            return res.status(500).json({message: 'Registration failed'});

        }


    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            error: "The mobile number you have entered is in use by a current member"
        });
    }
}

const getUserDetails = async (req, res) => {
    try {

        const {userID} = req.params

        const user = await DB.exec('GetUserDetailsProcedure', {UserID: userID})
        if (user.recordset.length === 0) {
            return res.status(404).json({error: 'User not found'});
        }

        return res.status(200).json(user.recordset[0]);

    } catch (e) {
        console.log(e)
        return res.status(500).json({error: e.message})
    }
}

const loginUser = async (req, res) => {
    try {

        const {Email, Password} = req.body
        const user = await DB.exec("UserLoginProcedure", {Email})


        if (user.recordset.length === 0) {
            return res.status(404).json({
                message: 'Could not find an account associated with the email address',
            });
        }

        const hashedPassword = user.recordset[0].Password;
        const passwordMatch = await bcrypt.compare(Password, hashedPassword);

        if (passwordMatch) {
            const payload = {
                UserID: user.recordset[0]?.UserID,
                UserName: user.recordset[0]?.UserName,
                PhoneNumber: user.recordset[0].PhoneNumber,
                Role: user.recordset[0]?.isAdmin === 1 ? 'admin' : 'user',
                Email: user.recordset[0].Email
            }
            const token = jwt.sign(payload, process.env.SECRET, {expiresIn: '36000'});

            return res.status(200).json({
                message: 'Login successful.',
                token,
            });
        } else {
            return res.status(401).json({
                error: "Incorrect password. Please retry."
            })
        }


    } catch (e) {
        console.log(e)
        return res.status(500).json({
            error: e.message
        })
    }
}


module.exports = {
    registerUser,
    getUserDetails,
    loginUser
}