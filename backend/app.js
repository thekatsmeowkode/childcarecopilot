// const express = require('express')
// require('dotenv').config()
// const { connectToDb, getDb } = require('./db')

// // initialize app & middleware
// const app = express()
// // db connection
// let db
// connectToDb((err) => {
//     if (!err) {
//         app.listen('3000', () => {
//             console.log('app started')
//         })
//         db = getDb()
//     }
// })

// // routes
// app.get('/classes', async (req, res) => {
    
//     let collection = await db.collection('classes')
        
//     let results = await collection.find({})

//     res.send(results).status(200)
// }
// )

