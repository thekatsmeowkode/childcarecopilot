const express = require('express')
const Classroom = require('../models/ClassModel')

const router = express.Router()

// GET all classes
router.get('/', (req, res) => {
    res.json({mssg:'GET all classes'})
})

// GET a single workout
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single class'})
})

// POST a class
router.post('/', async (req, res) => {
    const {roomName, students} = req.body
    try {
        const classroom = await Classroom.create({roomName, students})
        res.status(200).json(classroom)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
    res.json({mssg: 'POST a new workout'})
})

// DELETE a class
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a new workout'})
})

// UPDATE PATCH a class
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a new workout'})
})

module.exports = router