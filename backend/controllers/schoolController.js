const School = require("../models/SchoolModel");
const Classroom = require("../models/ClassModel");

const MS_PER_DAY = 24 * 60 * 60 * 1000;

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

//GET revenue for each class
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

//GET total students
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

    totalObj = { title: "Total Students", totalStudents };

    res.status(200).json(totalObj);
  } catch (error) {
    res.status(500).json({ error: "Error calculating total students" });
  }
};

//GET staff required per room based on ages
const getStaffRequired = async (req, res) => {
  try {
    const schoolData = await School.findOne({});

    if (!schoolData) {
      return res.status(404).json({ error: "School data not found" });
    }

    const classrooms = await Classroom.find();
    let countsUnder2 = { infants: 0, toddlers: 0, crawlers: 0, twos: 0 };
    let countsOver2 = { infants: 0, toddlers: 0, crawlers: 0, twos: 0 };

    const today = new Date();

    classrooms.forEach((classroom) => {
      classroom.students.forEach((student) => {
        const differenceInDays = Math.floor(
          (today - student.birthdate) / MS_PER_DAY
        );
        //730 is the number of days in 2 years
        if (differenceInDays < 730) {
          countsUnder2[student.classroomName] += 1;
        } else {
          countsOver2[student.classroomName] += 1;
        }
      });
    });

    const getStaffRequired = (room) => {
      let countUnder2 = countsUnder2[room];
      let countOver2 = countsOver2[room];
      let teacherCount = 0;
      if (countUnder2 > 0) {
        if (countUnder2 <= schoolData.ratioBirthToTwo) {
          return 1;
        }
        teacherCount += Math.floor(countUnder2 / schoolData.ratioBirthToTwo);
        console.log(`count after first operation: ${teacherCount}`);
        if (countUnder2 % schoolData.ratioBirthToTwo) {
          teacherCount += 1;
        }
      } else {
        console.log(schoolData);
        if (countOver2 <= schoolData.ratioTwoToThree) {
          return 1;
        }
        teacherCount += Math.floor(countOver2 / schoolData.ratioTwoToThree);
        if (countOver2 % schoolData.ratioTwoToThree) {
          teacherCount += 1;
        }
      }
      return teacherCount;
    };

    const staffRequired = {
      title: "Staff Required Core Hours",
      infants: {
        message: "Infant Room Teachers",
        value: getStaffRequired("infants"),
      },
      crawlers: {
        message: "Crawlers Room Teachers",
        value: getStaffRequired("crawlers"),
      },
      toddlers: {
        message: "Toddler Room Teachers",
        value: getStaffRequired("toddlers"),
      },
      twos: {
        message: "Twos Room Teachers",
        value: getStaffRequired("twos"),
      },

      schoolTotal: { message: "School Staff Required ", value: 0 },
    };
    //this has to happen after the revenue object is created
    staffRequired.schoolTotal.value =
      staffRequired.infants.value +
      staffRequired.crawlers.value +
      staffRequired.toddlers.value +
      staffRequired.twos.value;

    res.status(200).json({ staffRequired });
  } catch (error) {
    res.status(500).json({ error: "Error calculating total revenue" });
  }
};

module.exports = {
  addSchool,
  getSchool,
  updateSchool,
  getClassRevenue,
  getTotalStudents,
  getStaffRequired,
};
