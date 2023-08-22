CREATE OR ALTER PROCEDURE UpdateUserProcedure
    @UserID NVARCHAR(255),
    @Email NVARCHAR(100) = NULL,
    @PhoneNumber NVARCHAR(20) = NULL
AS
BEGIN
    UPDATE Users
    SET
        Email = ISNULL(@Email, Email),
        PhoneNumber = ISNULL(@PhoneNumber, PhoneNumber)
    WHERE UserID = @UserID;

    RETURN 0; -- Update successful
END;