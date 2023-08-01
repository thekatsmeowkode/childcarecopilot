const School = require("../models/SchoolModel");
const mongoose = require("mongoose");

//POST a school
const addSchool = async (req, res) => {
  const { ...form } = req.body;
  console.log(req.body);
  try {
    const school = await School.create({ ...form });
    res.status(200).json(school);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  res.json({ mssg: "POST the school" });
};

const getSchool = async (req, res) => {
  const school = await School.find({});
  res.status(200).json(school);
};

const updateSchool = async (req, res) => {};

module.exports = { addSchool, getSchool, updateSchool };
