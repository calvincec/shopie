CREATE OR ALTER PROCEDURE addToCartProc(@cartId VARCHAR(200), @UserID VARCHAR(200), @productId VARCHAR(200))
AS
BEGIN
    INSERT INTO cart(cartId, UserID, productId) VALUES(@cartId, @UserID, @productId)
    UPDATE products SET  stock=stock-1 WHERE   productId = @productId
    
    -- subtract 1
END

SELECT * FROM cart