const School = require("../models/SchoolModel");
const Classroom = require("../models/ClassModel");

//POST a school
const addSchool = async (req, res) => {
  const { ...form } = req.body;
  try {
    const school = await School.create({ ...form });
    res.status(200).json(school);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  res.json({ mssg: "POST the school" });
};

//GET the school
const getSchool = async (req, res) => {
  const school = await School.find({});
  res.status(200).json(school);
};

//PATCH the school
const updateSchool = async (req, res) => {
  await School.findByIdAndUpdate("64c84bb803361397826fd4fa", req.body),
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated User: ", docs);
      }
    };
  console.log(JSON.stringify(req.body));
};

const getClassRevenue = async (req, res) => {
  const PROGRAM_NAMES = ["earlyMorning", "extendedDay", "lateDay"];

  try {
    const schoolData = await School.findOne({});

    if (!schoolData) {
      return res.status(404).json({ error: "School data not found" });
    }

    const classrooms = await Classroom.find();
    let counts = { earlyMorning: 0, extendedDay: 0, lateDay: 0 };

    PROGRAM_NAMES.forEach((program) => {
      classrooms.forEach((classroom) => {
        counts[program] += classroom.students.reduce((acc, student) => {
          if (student.programs.includes(program)) {
            return acc + 1;
          }
          return acc;
        }, 0);
      });
    });

    const revenue = {
      earlyMorning: schoolData.costEarlyMorning * counts.earlyMorning,
      extendedDay: schoolData.costExtendedDay * counts.extendedDay,
      lateDay: schoolData.costLateDay * counts.lateDay,
    };
    //this has to happen after the revenue object is created
    revenue.totalAllProgram = revenue.earlyMorning + revenue.extendedDay + revenue.lateDay

    const messages = {
      title: "Total Revenue",
      totalRevenue: "School Monthly Revenue:",
      earlyMorning: "Early Morning Program:",
      extendedDay: "Extended Day Program:",
      lateDay: "Late Day Program:"
    }

    console.log(counts );
    console.log(revenue);

    res.status(200).json({ counts, revenue });
  } catch (error) {
    res.status(500).json({ error: "Error calculating total revenue" });
  }
};

module.exports = { addSchool, getSchool, updateSchool, getClassRevenue };
