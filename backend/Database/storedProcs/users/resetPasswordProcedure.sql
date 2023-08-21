CREATE OR ALTER PROCEDURE ResetPasswordProcedure
    @Token NVARCHAR(255),
    @NewPassword NVARCHAR(500)
AS
BEGIN
    -- Update the user's password and clear the reset token
    UPDATE Users
    SET Password = @NewPassword,
        ResetToken = NULL
    WHERE ResetToken = @Token;

    IF @@ROWCOUNT > 0
        RETURN 0; -- Password reset successful
    ELSE
        RETURN 1; -- Invalid token
END;
