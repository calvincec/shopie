CREATE OR ALTER PROCEDURE userViewCartProc(@UserID VARCHAR(200))
AS
BEGIN
    SELECT c.cartId, p.productId, p.productName, p.price, p.productDescription, p.productImage
    FROM cart c
    JOIN products p ON p.productId = c.productId
    WHERE c.UserID = @UserID
END

