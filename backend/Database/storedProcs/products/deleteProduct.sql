CREATE OR ALTER PROCEDURE deleteProductProc(@productId VARCHAR(200))
AS
BEGIN 
    DELETE FROM products WHERE productId=@productId
END