CREATE OR ALTER PROCEDURE getOneProjectProc(@productId VARCHAR(200))
AS
    BEGIN
        SELECT * FROM products WHERE productId = @productId
    END

-- EXECUTE getAllProjectsProc '0d8308be-3d3d-4f2f-ae30-ba24f302935a'