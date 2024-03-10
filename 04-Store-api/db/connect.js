const mongoose = require('mongoose')

const connectDb = (url) => {
    return mongoose
    .connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,})
    .then(()=> console.log('Connected with DB')).catch((err) => console.log(err))
}

module.exports = connectDb