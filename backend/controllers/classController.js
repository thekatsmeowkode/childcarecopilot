const Classroom = require('../models/ClassModel')

//get all classes
const getClassrooms = async (req, res) => {
    const classrooms = await Classroom.find({})
    res.status(200).json(classrooms)
}

//get class by id
const getClassroom = async (req, res) => {
    
}

//create a new class
const createClassroom = async (req, res) => {
    const {roomName, students} = req.body

    // add doc to db
    try {
        const classroom = await Classroom.create({roomName, students})
        res.status(200).json(classroom)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
    res.json({mssg: 'POST a new workout'})
}

//delete a class

//update a class

module.exports = {
    createClassroom, getClassrooms
}