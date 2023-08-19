

CREATE OR ALTER PROCEDURE removeItemFromCartProc(@cartId VARCHAR(200))
AS
BEGIN 
    DELETE FROM cart WHERE cartId=@cartId
END