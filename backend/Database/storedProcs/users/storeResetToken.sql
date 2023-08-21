CREATE OR ALTER PROCEDURE StoreResetTokenProcedure
    @Email NVARCHAR(100),
    @ResetToken NVARCHAR(255)
AS
BEGIN
    UPDATE Users
    SET ResetToken = @ResetToken
    WHERE Email = @Email;

    RETURN 0;
END;
