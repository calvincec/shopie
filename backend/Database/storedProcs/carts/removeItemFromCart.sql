CREATE OR ALTER PROCEDURE removeItemFromCartProc(@cartId VARCHAR(200))
AS
BEGIN 
    DELETE FROM cart WHERE cartId=@cartId
    -- UPDATE products SET  stock=stock+1 WHERE   productId = (SELECT productId FROM cart WHERE cartId=@cartId)
END;