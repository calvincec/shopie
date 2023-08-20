CREATE OR ALTER PROCEDURE getAllProjectsProc
AS
    BEGIN
        SELECT * FROM products WHERE stock>0
    END