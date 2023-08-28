import mssql from 'mssql'
import { addToCart, removeItemFromCart, userViewCart } from '../Controllers/cartsController'
const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
}

describe("Adding to cart", ()=>{
    it ('should add an item to cart  successfully', async()=>{
        const cartId = 'usiwsw'
        const samplebody = {
            productId: "229a1597-b2d5-46c7-a37b-2c58a424faab",
            orderNo: 2
        }
        const req = {
            params: "dhjdsjds",
            body: samplebody
        }
        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request:jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: [1]
            })
        })
        await addToCart(req, res)

        expect(res.json).toHaveBeenCalledWith({
            message: "Product added to cart successfully"
        })
        expect(res.status).toHaveBeenCalledWith(200)
    })
    it('should return an error if product not added to cart', async()=>{
        const cartId = 'usiwsw'
        const samplebody = {
            productId: "229a1597-b2d5-46c7-a37b-2c58a424faab",
            orderNo: 2
        }
        const req = {
            params: "dhjdsjds",
            body: samplebody
        }
        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request:jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: [0]
            })
        })
        await addToCart(req, res)

        expect(res.json).toHaveBeenCalledWith({
            message: "failed to add product to cart"
        }) 
    })
})



describe('User removing item from cart', ()=>{
    it('ought to remove an item from cart', async()=>{

        const id = 'redd'
        const req = {
            params: id
        }
        
        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request:jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: [1]
            })
        })

        await removeItemFromCart(req, res)

        expect(res.json).toHaveBeenCalledWith({
            message: "Product removed from cart"
        })
        expect(res.status).toHaveBeenCalledWith(200)
    })

    it('should raise an error if the product is not found in cart', async()=>{
       
        const id = 'redd'
        const req = {
            params: id
        }
        
        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request:jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: [0]
            })
        })

        await removeItemFromCart(req, res)

        expect(res.json).toHaveBeenCalledWith({
            message: "There is no such product in cart"
        })
        expect(res.status).toHaveBeenCalledWith(404)
    })
})




describe('User Viewing Cart', ()=>{
    it('User should view items in cart', async()=>{
        const req = {
            params: "dhjdsjds"
        }
        const samplebody = [
            {
                cartId: "358fc936-4bf2-471c-9bc9-1d2e9fe8a9dd",
                productId: "9909c6b2-3901-4619-87be-8653fcaa724a",
                productName: "test eight",
                price: 8,
                productDescription: "test eight",
                productImage: "https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/51/4520611/1.jpg?3204"
              },
              {
                cartId: "817299ad-d55d-408d-aa39-7996ed24239a",
                productId: "9909c6b2-3901-4619-87be-8653fcaa724a",
                productName: "test eight",
                price: 8,
                productDescription: "test eight",
                productImage: "https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/51/4520611/1.jpg?3204"
              }
            ]

        const mockresult = {
            rowsAffected: [3,3]
        }
        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request:jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: [2]
            }
            )
        })
        await userViewCart(req, res)
        expect(res.status).toHaveBeenCalledWith(200) 
    })


    it('should return an error if nothing in cart', async()=>{
        const req = {
            params: "dhjdsjds"
        }
        const samplebody = [
            {
                cartId: "358fc936-4bf2-471c-9bc9-1d2e9fe8a9dd",
                productId: "9909c6b2-3901-4619-87be-8653fcaa724a",
                productName: "test eight",
                price: 8,
                productDescription: "test eight",
                productImage: "https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/51/4520611/1.jpg?3204"
              },
              {
                cartId: "817299ad-d55d-408d-aa39-7996ed24239a",
                productId: "9909c6b2-3901-4619-87be-8653fcaa724a",
                productName: "test eight",
                price: 8,
                productDescription: "test eight",
                productImage: "https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/51/4520611/1.jpg?3204"
              }
            ]

        const mockresult = {
            rowsAffected: [3,3]
        }
        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request:jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: [0]
            }
            )
        })
        await userViewCart(req, res)
        expect(res.status).toHaveBeenCalledWith(404) 
    })

})
