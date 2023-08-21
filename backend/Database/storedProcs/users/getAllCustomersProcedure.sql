CREATE OR ALTER PROCEDURE GetAllCustomersProcedure
AS
BEGIN
    SELECT *
    FROM Users
    WHERE isAdmin = 0;
END;
