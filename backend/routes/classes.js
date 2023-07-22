const express = require('express')
const Classroom = require('../models/ClassModel')
const {createClassroom} = require('../controllers/classController')

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
router.post('/', createClassroom)

// DELETE a class
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a new workout'})
})

// UPDATE PATCH a class
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a new workout'})
})

module.exports = router