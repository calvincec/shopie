CREATE OR ALTER PROCEDURE addNewProductProc(@productId VARCHAR(200), @productName  VARCHAR(500), @productDescription VARCHAR(1000), @price INT, @productImage VARCHAR(500), @stock INT)
AS
BEGIN
    INSERT INTO products(productId, productName, productDescription, price, productImage,stock) VALUES (@productId, @productName, @productDescription, @price, @productImage, @stock)
END

SELECT * FROM products


