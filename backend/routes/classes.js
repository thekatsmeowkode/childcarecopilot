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
  deleteStudent,
  getStudent,
  getUpcomingBirthdays,
  getSortedAges
} = require("../controllers/classController");

const router = express.Router();

// GET all classes
router.get("/", getClassrooms);

// GET a single class
router.get("/:targetClass", getClassroom);

// POST a class
router.post("/", createClassroom);

// DELETE a class
router.delete("/admin/:roomName", deleteClassroom);

// UPDATE PATCH a class
router.patch("/:id", updateClassroom);

//UPDATE a student in a class
router.patch('/:targetClass/students/:studentId', updateStudent)

//POST a student to a class
router.post('/students', addStudent)

//DELETE a student in a class
// router.delete('/:classId/students/:studentId', deleteStudent)
router.delete('/:classroomName/students/:studentId', deleteStudent)

//GET one student
router.get('/:targetClass/students/:studentId', getStudent)

//Get upcoming birthdays
router.get('/navbar/birthdays', getUpcomingBirthdays)

router.get('/sort/:classroomName/sorted/get-sorted-ages/:toSort', getSortedAges)

module.exports = router;
