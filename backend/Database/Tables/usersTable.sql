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
    isActive    BIT DEFAULT 1,
    isAdmin     BIT DEFAULT 0
)

use shopie;
select * from Users


SELECT *
FROM Users;
create database shopie;
use shopie;
drop table cart
CREATE TABLE cart
(
    cartId    VARCHAR(200) PRIMARY KEY,
    UserID    NVARCHAR(255) NOT NULL,
    productId VARCHAR(200)  NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users (UserID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (productId) REFERENCES products (productId) ON DELETE CASCADE ON UPDATE CASCADE
)
