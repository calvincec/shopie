const express = require('express');
const cors = require('cors');
const { connectToPool } = require('./Config/config');
const { userRouter } = require('./Routes/usersRoutes');
const { productsRouter } = require('./Routes/productsRoutes');

const app = express();
const port = 4503;

app.use(cors());

app.use(express.json());

app.use('/users', userRouter);
app.use('/product', productsRouter)

connectToPool()
	.then(() => {
		app.listen(port, () => {
			console.log(`Server started on port ${port}`);
		});
	})
	.catch(error => {
		console.error('Error connecting to the database:', error);
	});
