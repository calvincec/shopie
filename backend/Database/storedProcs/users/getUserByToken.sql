CREATE OR ALTER PROCEDURE GetUserByResetTokenProcedure
@Token NVARCHAR(255)
AS
BEGIN
    SELECT *
    FROM Users
    WHERE ResetToken = @Token;
END;

use shopie;
SELECT * FROM Users;
SELECT * FROM Users WHERE ResetToken = 'de574dcb-05bf-439c-86bf-61f3ab56f87a' 