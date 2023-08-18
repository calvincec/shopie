const { createUsersTable } = require("../Database/Tables/createTables")



const registerUser = async (req, res)=>{
    try {
        createUsersTable()
    } catch (error) {
        return res.json({Error:error})
    }
}

