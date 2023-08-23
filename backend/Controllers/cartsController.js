const mssql = require('mssql')
const { sqlConfig } = require("../Config/config")
const {v4} = require('uuid')
const { createcartTable } = require('../Database/Tables/createTables')



const addToCart = async (req,res)=>{
    try {
        createcartTable()
        const cartId = v4()
        const UserID = req.params.UserID
        const {productId, orderNo} = req.body

        
        const pool = await mssql.connect(sqlConfig)
        const result = await pool.request()
        .input('cartId', mssql.VarChar,cartId)
        .input('UserID', mssql.VarChar, UserID)
        .input('productId', mssql.VarChar, productId)
        .input('orderNo', orderNo)
        .execute('addToCartProc')

        if(result.rowsAffected[0] == 1){
            return res.status(200).json({
                message: "Product added to cart successfully",
        })  
        }else{
                return res.json({message: "failed to add product to cart"})
        } 
        
    } catch (error) {
        console.log(error);
        // return res.status(400).json({Error: error})
        return res.status(400).json({Error: "The product does not exist in our records"})
    }
}

const userViewCart = async(req, res)=>{
    try {
        
        const UserID = req.params.UserID
        const pool = await mssql.connect(sqlConfig)
        const result = await pool.request()
        .input('UserID', mssql.VarChar, UserID)
        .execute('userViewCartProc')
       
        if(result.rowsAffected[0] > 0){
            
            const arr = result.recordset
            let sum = 0
            for (el in arr){
                sum = sum + arr[el].price
            }
            
            return res.json({
                products: result.recordset,
                totalPrice: sum
        })  
        }else{
                return res.status(404).json({message: "nothing in cart"})     
        }


    } catch (error) {
        return res.status(500).json({Error: "Error in our server, contact the admin to resolve the issue"})
    }
}

const removeItemFromCart = async(req,res)=>{
   try {
    const cartId = req.params.cartId
    const pool = await mssql.connect(sqlConfig)
    const result = await pool.request()
    .input("cartId", cartId)
    .execute('removeItemFromCartProc')

    if(result.rowsAffected[0] == 1){
        return res.status(200).json({
            message: "Product removed from cart",
    })  
    }else{
            return res.status(404).json({message: "There is no such product in cart"})
    }
   } catch (error) {
    console.log(error);
   }


}


module.exports = {
    addToCart,
    userViewCart,
    removeItemFromCart
}