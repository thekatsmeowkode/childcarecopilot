const express = require("express")
const { addSchool, getSchool, updateSchool, getClassRevenue } = require("../controllers/schoolController");

const router = express.Router();

router.post('/', addSchool)

router.get('/', getSchool)

router.patch('/', updateSchool)

router.get('/class-revenue', getClassRevenue)

module.exports = router

