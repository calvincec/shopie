const mssql = require('mssql')
const { sqlConfig } = require("../Config/config")
const {v4} = require('uuid')
const { createcartTable } = require('../Database/Tables/createTables')



const addToCart = async (req,res)=>{
    try {
        createcartTable()
        const cartId = v4()
        const userId = req.params.userId
        const {productId} = req.body

        const pool = await mssql.connect(sqlConfig)
        const result = await pool.request()
        .input('cartId', mssql.VarChar,cartId)
        .input('userId', mssql.VarChar, userId)
        .input('productId', mssql.VarChar, productId)
        .execute('addToCartProc')

        if(result.rowsAffected[0] == 1){
            return res.status(200).json({
                message: "Product added to cart successfully",
        })  
        }else{
                return res.json({message: "failed to add product to cart"})
        } 
        
    } catch (error) {
        return res.status(400).json({Error: error})
    }
}



module.exports = {
    addToCart
}