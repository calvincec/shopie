CREATE OR ALTER PROCEDURE UserLoginProcedure @Email NVARCHAR(100)
AS
BEGIN
    SELECT UserID, UserName, Email, PhoneNumber, Password, isAdmin
    FROM Users
    WHERE Email = @Email
end