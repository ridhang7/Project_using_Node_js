const express = require('express')
const app = express()
// v1Routes has information about the which path to choose and which method to choose
const v1Routes = require('./routes/v1');
const connectDB = require('./db/connect');
require('dotenv').config()
const port = process.env.port;

app.use(express.json())

app.use(express.static('./public'))

app.use('/api/v1', v1Routes)

// get - /api/v1/task
// post - /api/v1/task
// get - /api/v1/task/:taskId
// patch - /api/v1/task/:taskId
// delete - /api/v1/task/:taskId

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`Server is listening on port ${port}`));        
    } catch (error) {
        console.log(error);
    }
}

start()

//app.js -> is for routes and express configuration
//index.js  -> connection required before starting the application -> DB connections, Starting application, redis connection