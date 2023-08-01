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
      title: "Total Revenue",
      earlyMorning: {
        message: "Early Morning Program:",
        value: schoolData.costEarlyMorning * counts.earlyMorning,
      },
      extendedDay: {
        message: "Extended Day Program:",
        value: schoolData.costExtendedDay * counts.extendedDay,
      },
      lateDay: {
        message: "Late Day Program:",
        value: schoolData.costLateDay * counts.lateDay,
      },
      schoolTotal: { message: "School Monthly Revenue:", value: 0 },
    };
    //this has to happen after the revenue object is created
    revenue.schoolTotal.value =
      revenue.earlyMorning.value +
      revenue.extendedDay.value +
      revenue.lateDay.value;

    res.status(200).json({ counts, revenue });
  } catch (error) {
    res.status(500).json({ error: "Error calculating total revenue" });
  }
};

const getTotalStudents = async (req, res) => {
  try {
    const schoolData = await School.findOne({});

    if (!schoolData) {
      return res.status(404).json({ error: "School data not found" });
    }

    const classrooms = await Classroom.find();
    let totalStudents = 0;

    classrooms.forEach((classroom) => {
      totalStudents += classroom.students.reduce((acc, student) => {
        return acc + 1;
      }, 0);
    });

    totalObj = {title: "Total Students", totalStudents}

    res.status(200).json(totalObj)
  } catch (error) {
    res.status(500).json({ error: "Error calculating total students" });
  }
};

module.exports = {
  addSchool,
  getSchool,
  updateSchool,
  getClassRevenue,
  getTotalStudents,
};
