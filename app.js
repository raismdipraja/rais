const express = require('express');
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')


// midleware
app.use(bodyParser())

// import routes
const userRoutes = require('./routes/user')



// routesw
app.use('/user', userRoutes)


// connect to db
mongoose.connect(process.env.DB_CONNECTION,
     {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true})
let db = mongoose.connection


db.on('error', console.error.bind(console, 'Database Connection Error!'))
db.once('open', ()=> {
    console.log('Database is Connection')
})







// listen
app.listen(process.env.PORT, ()=> {
    console.log(`Server Running in ${process.env.PORT}`) || 8080
})