const { createProductsTable } = require("../Database/Tables/createTables")
const {v4} = require('uuid')
const mssql = require('mssql')
const { sqlConfig } = require("../Config/config")


const newProduct = async (req, res)=>{
    try {
        // createProductsTable()
        const productId = v4()
        const {productName, productDescription, price, productImage,stock} = req.body
        const pool = await mssql.connect(sqlConfig)

        const result = await pool.request()
        .input('productId', mssql.VarChar, productId)
        .input('productName', mssql.VarChar, productName)
        .input('productDescription', mssql.VarChar, productDescription)
        .input('price', mssql.Int, price)
        .input('productImage', mssql.VarChar, productImage)
        .input('stock', mssql.Int, stock)
        .execute('addNewProductProc')

        if(result.rowsAffected[0] == 1){
            return res.json({
                message: "Product added Successfully",
        })  
        }else{
                return res.json({message: "failed to add product"})
        } 
        
    } catch (error) {
        return res.status(400).json({Error: "Ensure you input the correct parameters"})
    }
}
const getAllProducts = async (req, res)=>{
    try {
        const pool = await mssql.connect(sqlConfig)
        const result = await pool.request()
        .execute('getAllProjectsProc')

        if(result.recordset.length<1){
            return res.json({products: []})
        }
        else {
            return res.status(200).json({products: result.recordset})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({Error: "Error in our server, contact the admin to resolve the issue"})
    }
}

const getOneProduct = async(req, res)=>{
try {
    const productId = req.params.productId
    const pool = await mssql.connect(sqlConfig)
    const result = await pool.request()
    .input('productId', mssql.VarChar, productId)
    .execute('getOneProjectProc')

    if(result.rowsAffected[0] == 1){
        return res.json({
            product: result.recordset
    })  
    }else{
            return res.status(404).json({message: "Product not found"})
    }
} catch (error) {
    return res.status(400).json({Error: error})
}
}

const updateProduct = async(req, res)=>{
    try {
        const productId = req.params.productId
        const {productName, productDescription, price, productImage,stock} = req.body

        const pool = await mssql.connect(sqlConfig)
        const result = await pool.request()
        .input('productId', mssql.VarChar, productId)
        .input('productName', mssql.VarChar, productName)
        .input('productDescription', mssql.VarChar, productDescription)
        .input('price', mssql.Int, price)
        .input('productImage', mssql.VarChar, productImage)
        .input('stock', mssql.Int, stock)
        .execute('updateProductProc')

        if(result.rowsAffected[0] == 1){
            return res.json({
                message: "Product updated Successfully",
        })  
        }else{
                return res.status(404).json({message: "Product not found"})
        }
    } catch (error) {
        return res.status(400).json({Error: "Ensure you input the correct parameters"})  
    }
}
const deleteProduct = async (req, res)=>{
    try {
        const productId = req.params.productId
        
        const pool = await mssql.connect(sqlConfig)
        const result = await pool.request()
        .input("productId", productId)
        .execute('deleteProductProc')
    
        if(result.rowsAffected[0] == 1){
            return res.status(200).json({
                message: "Product deleted Successfully",
        })  
        }else{
                return res.status(404).json({message: "There is no such product in our records"})
        }
    } catch (error) {
        return res.status(400).json({Error: error})
    }
}




module.exports = {
    newProduct,
    deleteProduct,
    updateProduct,
    getOneProduct,
    getAllProducts
}