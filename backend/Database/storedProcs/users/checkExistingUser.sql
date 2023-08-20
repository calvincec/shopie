CREATE  OR ALTER PROCEDURE CheckIfUserExistsProcedure
   @Email NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT * FROM Users WHERE Email = @Email;
END;

