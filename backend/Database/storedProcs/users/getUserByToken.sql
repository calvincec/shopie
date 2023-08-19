CREATE OR ALTER PROCEDURE GetUserByResetTokenProcedure
@Token NVARCHAR(255)
AS
BEGIN
    SELECT UserName, Email
    FROM Users
    WHERE ResetToken = @Token;
END;
