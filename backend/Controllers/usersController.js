const { v4 } = require('uuid');
const { DB } = require('../Database/helpers');
const bcrypt = require('bcrypt')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
const { sendMail } = require("../Database/helpers/email");

dotenv.config()

const registerUser = async (req, res) => {
    try {

        const UserID = v4();
        const { UserName, Email, Password, PhoneNumber, isActive, isAdmin } = req.body
        const existingUser = await DB.exec('CheckIfUserExistsProcedure', { Email })

        if (existingUser.recordset.length > 0) {
            return res.status(409).json({
                error: "An account with this email exists. Please sign in instead"
            })
        }
        const hashedPassword = await bcrypt.hash(Password, 10)
        const result = await DB.exec('registerUsersProcedure', {
            UserID,
            UserName,
            Email,
            Password: hashedPassword,
            PhoneNumber,
            isActive,
            isAdmin
        })

        if (result.returnValue === 0) {
            const userMessageOptions = {
                from: process.env.ADMIN_EMAIL,
                to: Email,
                subject: 'Account Registration',
                html: `
        <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px;">
            <h2  style="color: #333333; text-align: center;">Hello ${UserName},</h2>
        <p style="text-align: center;">Welcome to Shoppie!</p>
        <p style="text-align: center;">This is to inform you that your account has been successfully created.</p>
   
               
                <p style="text-align: center; ">If you have any questions or need assistance, feel free to contact us.</p>
                <p style="text-align: center; ">Best regards,</p>
                <p style="text-align: center; ">The Shoppie Team</p>
            </div>
        </div>
    `,
            };

            await sendMail(userMessageOptions)
            return res.status(201).json({
                message: `Account successfully created.`
            })
        } else {
            return res.status(500).json({ error: 'Registration failed' });

        }


    } catch (error) {
        console.log(error.message);
        if (error.message.includes(" Cannot insert duplicate key in object 'dbo.Users'")) {
            return res.status(500).json({
                error: "The mobile number you have entered is in use by a current member"
            });
        }

        return res.status(500).json({
            error: 'An error occurred during registration.'
        });

    }
}

const getUserDetails = async (req, res) => {
    try {

        const { userID } = req.params

        const user = await DB.exec('GetUserDetailsProcedure', { UserID: userID })
        if (user.recordset.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(user.recordset[0]);

    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: e.message })
    }
}

const loginUser = async (req, res) => {
    try {

        const { Email, Password } = req.body;
        const user = await DB.exec("UserLoginProcedure", { Email });

        if (user.recordset.length === 0) {
            return res.status(404).json({
                error: 'Could not find an account associated with the email address',
            });
        }

        if (!user.recordset[0].isActive) {
            return res.status(401).json({
                error: 'Account is deactivated. Please contact support for reactivation.',
            });
        }
        const hashedPassword = user.recordset[0].Password;
        const passwordMatch = await bcrypt.compare(Password, hashedPassword);

        if (passwordMatch) {
            const payload = {
                UserID: user.recordset[0]?.UserID,
                UserName: user.recordset[0]?.UserName,
                PhoneNumber: user.recordset[0].PhoneNumber,
                Role: user.recordset[0]?.isAdmin === true ? 'admin' : 'user',
                Email: user.recordset[0].Email
            }
            const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '36000' });

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
const initiatePasswordReset = async (req, res) => {
    try {

        const { Email } = req.body;

        const user = await DB.exec("CheckIfUserExistsProcedure", { Email });
        if (user.recordset.length === 0) {
            return res.status(404).json({
                error: "No account under that email exists"
            });
        } else {


            const resetToken = v4();

            const result = await DB.exec('StoreResetTokenProcedure', { Email, ResetToken: resetToken });

            if (result.returnValue === 0) {
                const mailOptions = {
                    from: process.env.ADMIN_EMAIL,
                    to: Email,
                    subject: 'Password Reset Request',
                    html: `
                    <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                margin: 0;
                                padding: 0;
                            }
                            
                            .container {
                                max-width: 600px;
                                margin: 0 auto;
                                padding: 20px;
                                border: 1px solid #e0e0e0;
                                border-radius: 5px;
                                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                            }
                            
                            .content {
                                margin-top: 20px;
                                text-align: center;
                            }
                            
                            .button {
                                display: inline-block;
                                background-color: #007bff;
                                color: #fff;
                                padding: 10px 20px;
                                border-radius: 5px;
                                text-decoration: none;
                            }
                            
                            .footer {
                                margin-top: 20px;
                                text-align: center;
                                color: #888;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="content">
                                <p>Hello!</p>
                                <p>We received a request to reset your password. Please use the following link to reset your password:</p>
                                <p><a class="button" href="http://127.0.0.1:5500/Frontend/reset-password/reset-password.html?token=${resetToken}">Reset Password</a></p>
                                <p>If you did not request a password reset, you can ignore this email.</p>
                            </div>
                            <div class="footer">
                                <p>Best regards,<br>The Shoppie Team</p>
                            </div>
                        </div>
                    </body>
                    </html> 
                `,
                };

                await sendMail(mailOptions);

                return res.status(200).json({
                    message: 'Password reset initiated. Check your email for instructions.',
                });
            } else {
                return res.status(500).json({
                    error: 'An error occurred while initiating password reset',
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'An error occurred',
        });
    }
};


const resetPassword = async (req, res) => {
    try {
        const { Token, NewPassword } = req.body;


        const hashedPassword = await bcrypt.hash(NewPassword, 10)
        const query = `SELECT * FROM Users WHERE ResetToken = '${Token}' `

        const userResult = await DB.query(query);

        const result = await DB.exec('ResetPasswordProcedure', { Token, NewPassword: hashedPassword });

        const users = userResult.recordset;



        const mailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: users[0].Email,
            subject: 'Password Reset Successful',
            html: `
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                    }
                    
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        border: 1px solid #e0e0e0;
                        border-radius: 5px;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    }
                    
                    .content {
                        margin-top: 20px;
                        text-align: center;
                    }
                    
                    .button {
                        display: inline-block;
                        background-color: #007bff;
                        color: #fff;
                        padding: 10px 20px;
                        border-radius: 5px;
                        text-decoration: none;
                    }
                    
                    .footer {
                        margin-top: 20px;
                        text-align: center;
                        color: #888;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="content">
                        <p> <b>Hello ${users[0].Username}! </b></p>
                        <p>Your password was succesfully reset.</p>
                        <p>If you did not reset it, please contact us immediately.</p>
                    </div>
                    <div class="footer">
                        <p>Best regards,<br>Shoppie</p>
                    </div>
                </div>
            </body>
            </html> 
        `,
        };

        if (result.returnValue === 0) {

            await sendMail(mailOptions)
            return res.status(200).json({
                message: 'Password reset successful.',
            });


        } else {
            return res.status(400).json({
                error: 'Password reset failed. Invalid token or password.',
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'An error occurred',
        });
    }
};

const getAllCustomers = async (req, res) => {
    try {

        const users = await DB.exec("GetAllCustomersProcedure")

        if (users.recordset.length > 0) {
            return res.status(200).json(users.recordset)
        } else {
            return res.status(404).json({
                message: "No customers found"
            })
        }
    } catch (e) {
        console.log(e)
    }
}


const updateProfile = async (req, res) => {
    try {
        const { UserID } = req.params; // Get UserID from URL parameter
        const { Email, PhoneNumber } = req.body; // Get updated Email and PhoneNumber from the request body

        const result = await DB.exec('UpdateUserProcedure', {
            UserID,
            Email,         // Only send Email if it's being updated
            PhoneNumber    // Only send PhoneNumber if it's being updated
        });

        return res.status(200).json({
            message: 'User information has been successfully updated.',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'An error occurred while updating user information.',
        });
    }
};

const deactivateAccount = async (req, res) => {
    try {
        const { UserID } = req.params
        const result = await DB.exec("DisableUserAccount", { UserID })

        console.log(result);
        if (result.returnValue === 0) {
            return res.status(200).json({
                message: "Account disabled succesfully"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error
        })
    }
}



module.exports = {
    registerUser,
    getUserDetails,
    loginUser,
    resetPassword,
    initiatePasswordReset,
    getAllCustomers,
    updateProfile,
    deactivateAccount,
    updateProfile
}