
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {DB} = require("../Database/helpers");
const {getAllCustomers, registerUser, deactivateAccount, loginUser, getUserDetails} = require("../Controllers/usersController");

jest.mock('backend/Database/helpers/index.js')
jest.mock('backend/Database/helpers/email.js')

describe("Fetch users", function () {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should return a list of customers if they exist", async () => {
        const mockUsers = { recordset: [{ id: 1, name: "User1" }, { id: 2, name: "User2" }] };
        DB.exec.mockResolvedValue(mockUsers);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getAllCustomers(req, res);

        expect(DB.exec).toHaveBeenCalledWith("GetAllCustomersProcedure");
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUsers.recordset);
    });

    it("should return a message and code 404 when no customers exist", async () => {
        const mockUsers = { recordset: [] };
        DB.exec.mockResolvedValue(mockUsers);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getAllCustomers(req, res);

        expect(DB.exec).toHaveBeenCalledWith("GetAllCustomersProcedure");
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: "No customers found",
        });
    });
});

describe("Register customers", function () {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should register a user and return a status 201", async () => {
        const req = {
            body: {
                UserName: "John Doe",
                Email: "john@doe.com",
                PhoneNumber: "",
                Password: "12345678",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const mockExistingUser = { recordset: [] };
        DB.exec.mockResolvedValueOnce(mockExistingUser);

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: "Account successfully registered" });
    });

    it("should return an error when user exists", async () => {
        const req = {
            body: {
                UserName: "John Doe",
                Email: "john@doe.com",
                PhoneNumber: "",
                Password: "12345678",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const mockExistingUser = { recordset: [{ id: 1, name: "John Doe" }] };
        DB.exec.mockResolvedValueOnce(mockExistingUser);

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            error: "An account with this email exists. Please sign in instead",
        });
    });
});

describe("Get User Details", function () {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should return user details if user exists", async () => {
        const mockUser = {
            recordset: [
                {
                    UserID: 1,
                    UserName: "John Doe",
                    Email: "john@example.com",
                    PhoneNumber: "1234567890",
                    isAdmin: false,
                },
            ],
        };
        DB.exec.mockResolvedValue(mockUser);

        const req = { params: { userID: 1 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getUserDetails(req, res);

        expect(DB.exec).toHaveBeenCalledWith("GetUserDetailsProcedure", { UserID: 1 });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUser.recordset[0]);
    });

    it("should return a 404 error when user does not exist", async () => {
        const mockUser = { recordset: [] };
        DB.exec.mockResolvedValue(mockUser);

        const req = { params: { userID: 1 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getUserDetails(req, res);

        expect(DB.exec).toHaveBeenCalledWith("GetUserDetailsProcedure", { UserID: 1 });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
    });
});

describe("Login User", function () {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should log in a user and return a JWT token", async () => {
        const mockUser = {
            recordset: [
                {
                    UserID: 1,
                    UserName: "John Doe",
                    Email: "john@example.com",
                    PhoneNumber: "1234567890",
                    isAdmin: false,
                    isActive: true,
                    Password: "$2b$10$mockHashedPassword",
                },
            ],
        };
        DB.exec.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(true);

        const req = {
            body: {
                Email: "john@example.com",
                Password: "password123",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await loginUser(req, res);

        expect(DB.exec).toHaveBeenCalledWith("UserLoginProcedure", { Email: "john@example.com" });
       // expect(bcrypt.compare).toHaveBeenCalledWith("password123", "$2b$10$mockHashedPassword");
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ token: expect.any(String) }));
    });

    it("should return a 401 error when account is not active", async () => {
        const mockUser = {
            recordset: [
                {
                    UserID: 1,
                    UserName: "John Doe",
                    Email: "john@example.com",
                    PhoneNumber: "1234567890",
                    isAdmin: false,
                    isActive: false,
                    Password: "$2b$10$mockHashedPassword",
                },
            ],
        };
        DB.exec.mockResolvedValue(mockUser);

        const req = {
            body: {
                Email: "john@example.com",
                Password: "password123",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await loginUser(req, res);

        expect(DB.exec).toHaveBeenCalledWith("UserLoginProcedure", { Email: "john@example.com" });
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: "Account is deactivated. Please contact support." });
    });

    it("should return a 401 error when password is incorrect", async () => {
        const mockUser = {
            recordset: [
                {
                    UserID: 1,
                    UserName: "John Doe",
                    Email: "john@example.com",
                    PhoneNumber: "1234567890",
                    isAdmin: false,
                    isActive: true,
                    Password: "$2b$10$mockHashedPassword",
                },
            ],
        };
        DB.exec.mockResolvedValue(mockUser);
       // bcrypt.compare.mockResolvedValue(false);

        const req = {
            body: {
                Email: "john@example.com",
                Password: "incorrectPassword",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await loginUser(req, res);

        expect(DB.exec).toHaveBeenCalledWith("UserLoginProcedure", { Email: "john@example.com" });

        expect(res.status).toHaveBeenCalledWith(401);
       expect(res.json).toHaveBeenCalledWith({ error: "Incorrect password. Please retry." });
    });

    it("should return a 404 error when user is not found", async () => {
        const mockUser = { recordset: [] };
        DB.exec.mockResolvedValue(mockUser);

        const req = {
            body: {
                Email: "nonexistent@example.com",
                Password: "password123",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await loginUser(req, res);

        expect(DB.exec).toHaveBeenCalledWith("UserLoginProcedure", { Email: "nonexistent@example.com" });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "Could not find an account associated with the email address" });
    });
});

describe("Deactivate Account", function () {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should deactivate a user account", async () => {
        const mockResult = { returnValue: 0 };
        DB.exec.mockResolvedValue(mockResult);

        const req = { params: { UserID: 1 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await deactivateAccount(req, res);

        expect(DB.exec).toHaveBeenCalledWith("DisableUserAccount", { UserID: 1 });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "Account disabled succesfully" });
    });

    it("should return a 500 error when deactivation fails", async () => {
        const mockResult = { returnValue: 1 }; 
        DB.exec.mockResolvedValue(mockResult);

        const req = { params: { UserID: 1 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await deactivateAccount(req, res);

        expect(DB.exec).toHaveBeenCalledWith("DisableUserAccount", { UserID: 1 });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 1 }); 
    });
});