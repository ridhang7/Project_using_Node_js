const express = require('express')
const app = express()
// v1Routes has information about the which path to choose and which method to choose
const v1Routes = require('./routes/v1');
const connectDB = require('./db/connect');
const notFound = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/errorHandler')
require('dotenv').config()
const port = process.env.port;

app.use(express.json());

app.use('/api/v1', v1Routes);

app.use(notFound);

app.use(errorHandlerMiddleware);

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`Server is listening on port ${port}`));        
    } catch (error) {
        console.log(error);
    }
}

start()