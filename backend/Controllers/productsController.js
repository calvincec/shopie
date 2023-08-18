const { createProductsTable } = require("../Database/Tables/createTables")




const newProduct = async (req, res)=>{
    try {
        createProductsTable()
    } catch (error) {
        return res.json({Error:error})
    }
}


