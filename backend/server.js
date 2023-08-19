const express = require ('express');
const { productsRouter, cartRouter } = require('./Routes/productsRoutes');


const app = express()

app.use(express.json())
app.use('/product',productsRouter)
app.use('/cart', cartRouter)


app.use((err, req, res, next)=>{ 
    res.json({Error: err})
})

app.listen(4503, ()=>{
    console.log('Server running on port 4503');
})