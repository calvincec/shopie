CREATE OR ALTER PROCEDURE registerUsersProcedure(
    @UserID NVARCHAR(255),
    @Username NVARCHAR(255),
    @Email NVARCHAR(100),
    @Password NVARCHAR(500),
    @PhoneNumber NVARCHAR(20),
    @isAdmin BIT,
    @isActive BIT,
    @ResetToken NVARCHAR(255) = NULL)
AS
BEGIN
    INSERT INTO Users
        (UserID, Username, Email, Password, PhoneNumber, isAdmin, isActive, ResetToken)
    VALUES
        (@UserID, @Username, @Email, @Password, @PhoneNumber, @isAdmin, @isActive, @ResetToken)
END;


