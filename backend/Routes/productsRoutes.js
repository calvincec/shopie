const {Router} = require('express')
const { newProduct, deleteProduct, updateProduct, getOneProduct, getAllProducts } = require('../Controllers/productsController')
const { addToCart, userViewCart, removeItemFromCart } = require('../Controllers/cartsController')

const productsRouter = Router()
const cartRouter = Router()

productsRouter.post('/', newProduct)
productsRouter.delete('/:productId', deleteProduct)
productsRouter.put('/:productId', updateProduct)
productsRouter.get('/one/:productId', getOneProduct)
productsRouter.get('/all', getAllProducts)



cartRouter.post('/:UserID', addToCart)
cartRouter.get('/view/:UserID', userViewCart)
cartRouter.delete('/:cartId', removeItemFromCart)





module.exports = {
    productsRouter,
    cartRouter
}