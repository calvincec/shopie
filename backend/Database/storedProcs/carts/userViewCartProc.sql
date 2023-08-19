CREATE OR ALTER PROCEDURE userViewCartProc(@userId VARCHAR(200))
AS
BEGIN
    SELECT c.cartId, p.productId, p.productName, p.price, p.productDescription, p.productImage
    FROM cart c
    JOIN products p ON p.productId = c.productId
    WHERE c.userId = @userId
END