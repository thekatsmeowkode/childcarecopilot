const express = require("express");
const {
  addStudentWL,
  createWaitlist,
  getWaitlistStudents,
  editStudent,
  getOneStudentId,
  getNumWLStudentsByCategory,
  getStudentsOlderThanTargetDate,
  getHistogramData,
  deleteStudent,
  getSortedAges
} = require("../controllers/waitlistController");

const router = express.Router();

router.post("/", createWaitlist);

router.post("/student", addStudentWL);

router.get("/", getWaitlistStudents);

router.patch("/:studentId", editStudent);

router.delete("/:studentId", deleteStudent)

router.get("/:studentName", getOneStudentId);

router.get("/dashboard/:category", getNumWLStudentsByCategory);

// GET students older than target date in school
router.get('/:selectedDate/:inputMonthsOld', getStudentsOlderThanTargetDate)

router.get('/histogram/data/:selectedDate', getHistogramData)

router.get('/sort/get-sorted-ages', getSortedAges)

module.exports = router;
