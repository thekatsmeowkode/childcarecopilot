const express = require("express");
const {
  addSchool,
  getSchool,
  updateSchool,
  getClassRevenue,
  getTotalStudents,
  getStaffRequired,
} = require("../controllers/schoolController");

const router = express.Router();

router.post("/", addSchool);

router.get("/", getSchool);

router.patch("/", updateSchool);

router.get("/class-revenue", getClassRevenue);

router.get("/total-students", getTotalStudents);

router.get("/staff-required", getStaffRequired);

module.exports = router;
