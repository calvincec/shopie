CREATE OR ALTER PROCEDURE DisableUserAccount
    @UserID NVARCHAR(255)
AS
BEGIN
    UPDATE Users
    SET isActive = 0
    WHERE UserID = @UserID;
    
    RETURN 0; -- Success
END;
