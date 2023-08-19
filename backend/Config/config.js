const mssql = require ('mssql')
const dotenv = require ('dotenv')
dotenv.config()

const pool = new mssql.ConnectionPool({
	user: process.env.DB_USER,
	password: process.env.DB_PWD,
	database: process.env.DB_NAME,
	server: 'localhost',
	pool: {
		max: 10,
		min: 0,
		idleTimeoutMillis: 30000,
	},
	options: {
		encrypt: false,
		trustServerCertificate: false,
	},
});

const connectToPool = async () => {
	try {
		await pool.connect();
		console.log('connected to db...');
	} catch (error) {
		console.log('error connecting to database pool', error);
	}
};


module.exports = {
    pool,
    connectToPool
}