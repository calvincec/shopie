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
            // console.log('Table created Successfully');
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
        
            CREATE TABLE Users
            (
                UserID      NVARCHAR(255) PRIMARY KEY,
                Username    NVARCHAR(255) NOT NULL,
                Email       NVARCHAR(100) NOT NULL,
                PhoneNumber NVARCHAR(20) UNIQUE,
                Password    NVARCHAR(500) NOT NULL,
                ResetToken  NVARCHAR(255),
                isAdmin     BIT DEFAULT 0
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
            // console.log('Table created Successfully');
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
                cartId VARCHAR(200) PRIMARY KEY,
                UserID NVARCHAR(255) NOT NULL,
                productId VARCHAR(200) NOT NULL,
                FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE ON UPDATE CASCADE,
                FOREIGN KEY (productId) REFERENCES products(productId) ON DELETE CASCADE ON UPDATE CASCADE 
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
            // console.log('Table created Successfully');
        }
    })

    } catch (error) {
        console.log(error);
        return ({Error: error})
    }
}


module.exports = {
    createUsersTable,
    createProductsTable,
    createcartTable  
}