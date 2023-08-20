
use shopie;
drop table Users;
CREATE TABLE Users
(
    UserID      NVARCHAR(255) PRIMARY KEY,
    Username    NVARCHAR(255) NOT NULL,
    Email       NVARCHAR(100) NOT NULL,
    PhoneNumber NVARCHAR(20) UNIQUE,
    Password    NVARCHAR(500) NOT NULL,
    ResetToken  NVARCHAR(255),
    isAdmin     BIT DEFAULT 0
)

select * from Users;

SELECT * FROM Users WHERE isAdmin IS null;