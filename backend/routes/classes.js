const express = require("express");
const Classroom = require("../models/ClassModel");
const {
  createClassroom,
  getClassrooms,
  getClassroom,
  updateClassroom,
  deleteClassroom,
  updateStudent,
  addStudent,
  deleteStudent
} = require("../controllers/classController");

const router = express.Router();

// GET all classes
router.get("/", getClassrooms);

// GET a single class
router.get("/:id", getClassroom);

// POST a class
router.post("/", createClassroom);

// DELETE a class
router.delete("/:id", deleteClassroom);

// UPDATE PATCH a class
router.patch("/:id", updateClassroom);

//UPDATE a student in a class
router.patch('/:classId/students/:studentId', updateStudent)

//POST a student to a class
router.post('/:classId/students', addStudent)

//DELETE a student in a class
router.delete('/:classId/students/:studentId', deleteStudent)

module.exports = router;
