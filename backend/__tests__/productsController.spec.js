import mssql from 'mssql'
import { deleteProduct, getAllProducts, getOneProduct, newProduct, updateProduct } from '../Controllers/productsController'

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
}

describe('Adding a new product', ()=>{
    it ('should add a new product successfully', async()=>{
        const mockBody = {
            productName: "clothed piece phone wear",
            productDescription: "Fashion 6Pcs Soft Cotton Checked Men's Boxers – Multicolor",
            price: 650,
            productImage: "https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/91/432928/1.jpg?7106",
            stock: 198
        }
        const req = {
            body: mockBody
        }

        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request:jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: [1]
            })
        })
        await newProduct(req, res)

        expect(res.json).toHaveBeenCalledWith({
            message: "Product added Successfully"
        })
    })
    it('should raise an error if the price or stock is not a number', async()=>{

        const mockBody = {
            productName: "clothed piece phone wear",
            productDescription: "Fashion 6Pcs Soft Cotton Checked Men's Boxers – Multicolor",
            price: "pen",
            productImage: "https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/91/432928/1.jpg?7106",
            stock: 198
        }
        const req = {
            body: mockBody
        }

        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request:jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({ })
        })
        await newProduct(req, res)

        expect(res.json).toHaveBeenCalledWith({
            Error: "Ensure you input the correct parameters"
        })
        
    })
})


describe('getting all products', ()=>{
    it('should get all products successfully', async()=>{
       
        const mockProjects = [
            {
                productId: "3c986216-b547-4162-8daf-92188a800c42",
                productName: "sic",
                productDescription: "ddsd",
                price: 43,
                productImage: "http://res.cloudinary.com/dzuzy670c/image/upload/v1693052223/cfmhsrpabzelpfwatrvd.jpg",
                stock: 45
              },
              {
                productId: "441774e6-ad2c-4f08-99fb-9931bae09c72",
                productName: "pen house",
                productDescription: "pen pen",
                price: 23,
                productImage: "https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/44/5171151/1.jpg?5457",
                stock: 33
              }
        ]

        const req = {}

        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                recordset: mockProjects
            })
        })

        await getAllProducts(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({products: mockProjects})
    })
})

// describe('getting one product', ()=>{
//     it("should get one product successfully", async()=>{
//         const prodid = 'sryiuaraw1234'
//         const mockProduct = {
//             productId: "3c986216-b547-4162-8daf-92188a800c42",
//             productName: "sic",
//             productDescription: "ddsd",
//             price: 43,
//             productImage: "http://res.cloudinary.com/dzuzy670c/image/upload/v1693052223/cfmhsrpabzelpfwatrvd.jpg",
//             stock: 45
//           }

//         const req = {
//             params: {
//                 id: prodid
//             }
//         }

//         jest.spyOn(mssql, "connect").mockResolvedValueOnce({
//             request: jest.fn().mockReturnThis(),
//             input: jest.fn().mockReturnThis(),
//             execute: jest.fn().mockResolvedValueOnce({
//                 recordset: [mockProduct]
                
//             })
//         })

//         await getOneProduct(req, res)

//         // expect(res.status).toHaveBeenCalledWith(200)
//         expect(res.json).toHaveBeenCalledWith({product: [mockProduct]})   
//     })
// })


describe('Updating a product', ()=>{
    it('should update one product successfuly', async()=>{
        const id = 'sryiuaraw1234'
        const updatedProduct = {
            productName: "Steel door",
            productDescription: "To prevent thieves",
            price: 400000000,
            productImage: "https://images.pexels.com/photos/7054511/pexels-photo-7054511.jpeg?auto=compress&cs=tinysrgb&w=600",
            stock: 4543
        }
        const req = {
            params:{
                id:id
            },
            body: updatedProduct
        }
        
        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: [1]
            })
        })

        await updateProduct(req, res)

        expect(res.json).toHaveBeenCalledWith({
            message: "Product updated Successfully"
        })
    })
    it('should return an error if the id doesnot exist', async()=>{
        const id = 'sryiuaraw1234'
        const updatedProduct = {
            productName: "Steel door",
            productDescription: "To prevent thieves",
            price: 400000000,
            productImage: "https://images.pexels.com/photos/7054511/pexels-photo-7054511.jpeg?auto=compress&cs=tinysrgb&w=600",
            stock: 4543
        }
        const req = {
            params:{
                id:id
            },
            body: updatedProduct
        }
        
        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: [0]
            })
        })

        await updateProduct(req, res)

        expect(res.json).toHaveBeenCalledWith({
            message: "Product not found"
        })
    })
})


describe('Should delete a product successfully', ()=>{
    it('should delete a product successfully', async()=>{
        const productID = 'sryiuaraw1234'
        const req = {
            params:{
                id: productID
            }
        }

        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: [1]
            })
        })

        await deleteProduct(req, res)

        expect(res.json).toHaveBeenCalledWith({
            message: 'Product deleted Successfully'
        })
    })

    it('should return an error if product does not exist', async()=>{
        const productID = 'sryiuaraw1234'
        const req = {
            params:{
                id: productID
            }
        }

        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: [0]
            })
        })

        await deleteProduct(req, res)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({
            message: 'There is no such product in our records'
        })
    })
})