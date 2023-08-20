const validateRegistration = (req, res, next) => {
    const {UserName, Email, PhoneNumber, Password} = req.body


    if (!UserName || !Email || !PhoneNumber || !Password) {
        return res.status(400).json({
            error: "Please ensure all fields are filled."
        })
    }

    if (!validateEmailFormat(Email)) {
        return res.status(400).json({
            error: "Invalid email format"
        })
    }

    next()
}


const validateLogin = (req, res, next) => {
    const {Email, Password} = req.body
    if(!Email||!Password){
        return res.status(400).json({
            error: "Please ensure all fields are filled"
        })
    }

    if(!validateEmailFormat(Email)){
        return  res.status(400).json({
            error: "Invalid email format"
        })
    }

    next()

}


const validateResetPassword = (req, res, next) => {
    const {Email} = req.body

    if(!validateEmailFormat(Email)){
        return res.status(400).json({
            error: "Invalid email format"
        })
    }
}

const validateEmailFormat = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};


module.exports = {
    validateRegistration,
    validateLogin,
    validateResetPassword
}