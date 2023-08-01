const express = require("express")
const { addSchool, getSchool, updateSchool } = require("../controllers/schoolController");

const router = express.Router();

router.post('/', addSchool)

router.get('/', getSchool)

router.patch('/', updateSchool)

module.exports = router

