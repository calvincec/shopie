CREATE OR ALTER PROCEDURE GetAllCustomersProcedure
AS
BEGIN
    SELECT *
    FROM Users
    WHERE isAdmin IS NULL;
END;
