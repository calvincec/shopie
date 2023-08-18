const express = require ('express');


const app = express()

app.use(express.json())


app.use((err, req, res, next)=>{ 
    res.json({Error: err})
})

app.listen(4503, ()=>{
    console.log('Server running on port 4503');
})