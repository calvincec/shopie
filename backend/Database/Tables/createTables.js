const mssql = require ('mssql');
const { sqlConfig } = require('../../Config/config');

const createProductsTable = async(req, res)=>{
    try {
        const table = `
        BEGIN 
        TRY
            CREATE TABLE products(
                productId VARCHAR(200) PRIMARY KEY,
                productName VARCHAR(500) NOT NULL,
                productDescription VARCHAR(500) NOT NULL,
                price INT NOT NULL,
				productImage VARCHAR(500) NOT NULL,
				stock INT NOT NULL,
            )
        END TRY
    BEGIN   
        CATCH
            
        END CATCH`;

    const pool = await mssql.connect(sqlConfig)
    await pool.request().query(table, (err)=>{
        if(err instanceof mssql.RequestError){

            console.log({Error: err.message});
        }else{
            console.log('Table created Successfully');
        }
    })

    } catch (error) {
        console.log(error);
        return ({Error: error})
    }
}

const createUsersTable = async(req, res)=>{
    try {
        const table = `
        BEGIN 
        TRY
            CREATE TABLE users(
                userId VARCHAR(200) PRIMARY KEY,
                userName VARCHAR(500) NOT NULL,
                userEmail VARCHAR(200) NOT NULL,
                userpwd VARCHAR(500) NOT NULL,
				isAdmin BIT DEFAULT 0
            )
        END TRY
        BEGIN   
        CATCH
            
        END CATCH`;

    const pool = await mssql.connect(sqlConfig) 
    await pool.request().query(table, (err)=>{
        if(err instanceof mssql.RequestError){

            console.log({Error: err.message});
        }else{
            console.log('Table created Successfully');
        }
    })

    } catch (error) {
        console.log(error);
        return ({Error: error})
    }
}

const createcartTable = async(req, res)=>{
    try {
        const table = `
        BEGIN 
        TRY
            CREATE TABLE cart(
                userId VARCHAR(200) ,
                productId VARCHAR(500) NOT NULL
            )
        END TRY
        BEGIN   
        CATCH
            
        END CATCH`;

    const pool = await mssql.connect(sqlConfig) 
    await pool.request().query(table, (err)=>{
        if(err instanceof mssql.RequestError){

            console.log({Error: err.message});
        }else{
            console.log('Table created Successfully');
        }
    })

    } catch (error) {
        console.log(error);
        return ({Error: error})
    }
}


module.exports = {
    createUsersTable,
    createProductsTable    
}