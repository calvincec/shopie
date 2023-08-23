CREATE OR ALTER PROCEDURE UpdateUserProcedure
    @UserID NVARCHAR(255), 
    @Email NVARCHAR(100) = NULL,
    @PhoneNumber NVARCHAR(20) = NULL
AS
BEGIN
    -- Log input parameters
    PRINT 'Updating user information for UserID: ' + @UserID;

    DECLARE @Updates INT = 0;

    IF @Email IS NOT NULL
    BEGIN
        UPDATE Users
        SET Email = @Email
        WHERE UserID = @UserID;
        
        SET @Updates += @@ROWCOUNT;
    END;

    IF @PhoneNumber IS NOT NULL
    BEGIN
        UPDATE Users
        SET PhoneNumber = @PhoneNumber
        WHERE UserID = @UserID;

        SET @Updates += @@ROWCOUNT;
    END;

    -- Check if update was successful
    IF @Updates > 0
    BEGIN
        PRINT 'User information updated successfully.';
        RETURN 0; -- Update successful
    END
    ELSE
    BEGIN
        PRINT 'User not found or no changes made.';
        RETURN 1; -- User not found or no changes made
    END
END;
