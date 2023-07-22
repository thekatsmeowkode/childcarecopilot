require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const classRoutes = require('./routes/classes')

//express app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/classes', classRoutes)

//connect to db
mongoose.connect(process.env.CONNECTION)
    .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
    console.log('listening on port 4000')
})
    })
    .catch((error) => {
        console.log(error)
    })



