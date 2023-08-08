const express = require("express");
const {
  addStudentWL,
  createWaitlist,
  getWaitlistStudents,
  editStudent,
  getOneStudentId,
  getNumWLStudentsByCategory,
} = require("../controllers/waitlistController");

const router = express.Router();

router.post("/", createWaitlist);

router.post("/student", addStudentWL);

router.get("/", getWaitlistStudents);

router.patch("/:studentId", editStudent);

router.get("/:studentName", getOneStudentId);

router.get("/dashboard/:category", getNumWLStudentsByCategory);

module.exports = router;
