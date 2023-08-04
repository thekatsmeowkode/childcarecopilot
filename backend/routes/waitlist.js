const express = require("express");
const { addStudentWL, createWaitlist } = require("../controllers/waitlistController");

const router = express.Router();

router.post('/', createWaitlist)

router.post("/student", addStudentWL);

module.exports = router