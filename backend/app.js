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
    let students = []

    db.collection('students')
        .find()
        .sort({ name: 1})
        .forEach(student => students.push(student))
        .then(() => {
            res.status(200).json(students)
        })
        .catch(() => {
            res.status(500).json({error: "Could not fetch the documents."})
        })
})

