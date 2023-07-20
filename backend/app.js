const express = require('express')
require('dotenv').config()
const { connectToDb, getDb } = require('./db')

// initialize app & middleware
const app = express()
// db connection
let db
connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('app')
        })
        db = getDb()
    }
})

// routes
app.get('/students', (req, res) => {
    res.json({messg: "Welcome to the api!"})
})

