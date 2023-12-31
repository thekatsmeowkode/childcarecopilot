const express = require("express");
const {
  addSchool,
  getSchool,
  updateSchool,
  getClassRevenue,
  getTotalStudents,
  getStaffRequiredCore,
  getStaffPerProgram,
  getBoxPlotData,
  getSchoolCapacity,
  getFoodRequirements
} = require("../controllers/schoolController");

const router = express.Router();

router.post("/", addSchool);

router.get("/", getSchool);

router.patch("/", updateSchool);

router.get("/class-revenue", getClassRevenue);

router.get("/total-students", getTotalStudents);

router.get("/staff-required", getStaffRequiredCore);

router.get("/staff-required/:program", getStaffPerProgram)

router.get('/box-plot-data', getBoxPlotData)

router.get('/school-capacity', getSchoolCapacity)

router.get('/get-food-requirements', getFoodRequirements)

module.exports = router;
