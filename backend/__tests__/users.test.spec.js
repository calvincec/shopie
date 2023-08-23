
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {DB} = require("../Database/helpers");
const {getAllCustomers, registerUser} = require("../Controllers/usersController");

jest.mock('backend/Database/helpers/index.js')
jest.mock('backend/Database/helpers/email.js')


describe('Fetch users', function () {
    afterEach(() => {
        jest.restoreAllMocks()
    })
    it('should return a list of customers if they exist', async ()  => {
        const mockUsers = {recordset: [{id: 1, name: 'User1'}, {id: 2, name: 'User2'}, {id: 3, name: "User3"}] };
        DB.exec.mockResolvedValue(mockUsers)

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getAllCustomers(req, res)

        expect(DB.exec).toHaveBeenCalledWith("GetAllCustomersProcedure")
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUsers.recordset);

    });


    it('should return a message and code 404 when no customers exist', async ()  => {
        const mockUsers = {recordset: [] }
        DB.exec.mockResolvedValue(mockUsers)
        const req = {}
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllCustomers(req, res)

        expect(DB.exec).toHaveBeenCalledWith('GetAllCustomersProcedure')
        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({
            message: "No customers found"
        })

    });
});

describe("Register customers", function () {
    afterEach(() => {
        jest.restoreAllMocks()
    })
    it('should register a user and return a status 201', async () => {

        const req = {
            body:{
                UserName: "John Doe",
                Email: "john@doe.com",
                PhoneNumber: "",
                Password: "12345678"

            }
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const mockExistingUser = {recordset: []};
        DB.exec.mockResolvedValueOnce(mockExistingUser);

       await registerUser(req, res)

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith({message: 'Account successfully registered'});
    });


    it('should return an error when user exists', async() => {
        
    })
})