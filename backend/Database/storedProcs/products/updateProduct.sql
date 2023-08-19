CREATE OR ALTER PROCEDURE updateProductProc(@productId VARCHAR(200), @productName  VARCHAR(500), @productDescription VARCHAR(1000), @price INT, @productImage VARCHAR(500), @stock INT)
AS
BEGIN
    UPDATE products SET  productName = @productName, productDescription =@productDescription, price=@price, productImage=@productImage,stock=@stock
    WHERE   productId = @productId
END

-- SELECT * FROM products