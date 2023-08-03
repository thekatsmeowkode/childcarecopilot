const School = require("../models/SchoolModel");
const Classroom = require("../models/ClassModel");

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const divideAges = async (program) => {
  const classrooms = await Classroom.find();
  let countsUnder2 = { infants: 0, toddlers: 0, crawlers: 0, twos: 0 };
  let countsOver2 = { infants: 0, toddlers: 0, crawlers: 0, twos: 0 };

  const today = new Date();

  if (program) {
    classrooms.forEach((classroom) => {
      classroom.students.forEach((student) => {
        if (student.programs.includes(program)) {
          const differenceInDays = Math.floor(
            (today - student.birthdate) / MS_PER_DAY
          );
          //730 is the number of days in 2 years
          if (differenceInDays < 730) {
            countsUnder2[student.classroomName] += 1;
          } else {
            countsOver2[student.classroomName] += 1;
          }
        }
      });
    });
  } else {
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
  }
  return { countsUnder2, countsOver2 };
};

const calculateMonthsOld = (birthdate) => {
  const now = new Date();
  const birthDate = new Date(birthdate);

  let monthsOld = (now.getFullYear() - birthDate.getFullYear()) * 12;
  monthsOld += now.getMonth() - birthDate.getMonth();

  // Adjust months if the birthdate day is after the current day of the month
  if (now.getDate() < birthDate.getDate()) {
    monthsOld--;
  }

  return monthsOld;
};

const getStaffRequired = (room, schoolData, dividedAges) => {
  let countUnder2 = dividedAges.countsUnder2[room];
  let countOver2 = dividedAges.countsOver2[room];
  if (!countOver2 && !countUnder2) {
    return 0;
  }

  let teacherCount = 0;
  if (countUnder2 > 0) {
    if (countUnder2 <= schoolData.ratioBirthToTwo) {
      return 1;
    }
    teacherCount += Math.floor(countUnder2 / schoolData.ratioBirthToTwo);
    if (countUnder2 % schoolData.ratioBirthToTwo) {
      teacherCount += 1;
    }
  } else {
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

const getStudentsPerProgram = async () => {
  const PROGRAM_NAMES = ["earlyMorning", "extendedDay", "lateDay"];

  let roomsWithCounts = {
    infants: { earlyMorning: 0, extendedDay: 0, lateDay: 0 },
    crawlers: { earlyMorning: 0, extendedDay: 0, lateDay: 0 },
    toddlers: { earlyMorning: 0, extendedDay: 0, lateDay: 0 },
    twos: { earlyMorning: 0, extendedDay: 0, lateDay: 0 },
  };

  try {
    const rooms = await Classroom.find();

    rooms.forEach((classroom) => {
      let counts = { earlyMorning: 0, extendedDay: 0, lateDay: 0 };
      PROGRAM_NAMES.forEach((program) => {
        counts[program] += classroom.students.reduce((acc, student) => {
          if (student.programs.includes(program)) {
            return acc + 1;
          }
          return acc;
        }, 0);
      });
      roomsWithCounts[classroom.roomName] = counts;
    });

    return roomsWithCounts;
  } catch (error) {
    console.log(error);
  }
};

const getNumStudents = async () => {
  const classrooms = await Classroom.find();
  let totalStudents = 0;

  classrooms.forEach((classroom) => {
    totalStudents += classroom.students.reduce((acc, student) => {
      return acc + 1;
    }, 0);
  });
  return totalStudents;
};

const getNumStudentsByClass = async () => {
  let countPerRoom = { infants: 0, crawlers: 0, toddlers: 0, twos: 0 };

  try {
    const classrooms = await Classroom.find();

    let countPerRoom = { infants: 0, crawlers: 0, toddlers: 0, twos: 0 };

    classrooms.forEach((classroom) => {
      const roomName = classroom.roomName;
      countPerRoom[roomName] += classroom.students.reduce((acc, student) => {
        return acc + 1;
      }, 0);
    });

    return countPerRoom;
  } catch (error) {
    console.log(error);
  }
};

//----------------------------------
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

    const totalStudents = await getNumStudents();

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
      totalStudents * schoolData.costCoreProgram +
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

//GET staff required per room based on ages for CORE PROGRAM
const getStaffRequiredCore = async (req, res) => {
  try {
    const schoolData = await School.findOne({});

    if (!schoolData) {
      return res.status(404).json({ error: "School data not found" });
    }

    const dividedAges = await divideAges();

    const studentCount = await getNumStudentsByClass();

    const staffCoreHours = {
      title: "Staff Required Core Hours",
      infants: {
        message: "Infant Room Teachers",
        numTeachers: getStaffRequired("infants", schoolData, dividedAges),
        numStudents: studentCount.infants,
      },
      crawlers: {
        message: "Crawlers Room Teachers",
        numTeachers: getStaffRequired("crawlers", schoolData, dividedAges),
        numStudents: studentCount.crawlers,
      },
      toddlers: {
        message: "Toddler Room Teachers",
        numTeachers: getStaffRequired("toddlers", schoolData, dividedAges),
        numStudents: studentCount.toddlers,
      },
      twos: {
        message: "Twos Room Teachers",
        numTeachers: getStaffRequired("twos", schoolData, dividedAges),
        numStudents: studentCount.twos,
      },

      schoolTotal: { message: "School Staff Required ", numTeachers: 0 },
    };
    //this has to happen after the revenue object is created
    staffCoreHours.schoolTotal.numTeachers =
      staffCoreHours.infants.numTeachers +
      staffCoreHours.crawlers.numTeachers +
      staffCoreHours.toddlers.numTeachers +
      staffCoreHours.twos.numTeachers;

    res.status(200).json({ staffCoreHours });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error calculating staff required core hours" });
  }
};

//GET staff required per room based on ages for OPTIONAL PROGRAMS
const getStaffPerProgram = async (req, res) => {
  const { program } = req.params;

  let textOutput = "";

  switch (program) {
    case "earlyMorning": {
      textOutput = "Early Morning";
      break;
    }
    case "extendedDay": {
      textOutput = "Extended Day";
      break;
    }
    case "lateDay": {
      textOutput = "Late Day";
      break;
    }
  }

  try {
    const schoolData = await School.findOne({});

    if (!schoolData) {
      return res.status(404).json({ error: "School data not found" });
    }

    const dividedAges = await divideAges(program);

    const studentsPerProgram = await getStudentsPerProgram();

    const staffPerProgram = {
      dataLabel: program,
      title: "Staff Required " + textOutput,
      infants: {
        message: "Infant Room Teachers",
        numTeachers: getStaffRequired("infants", schoolData, dividedAges),
        numStudents: studentsPerProgram.infants[program],
      },
      crawlers: {
        message: "Crawlers Room Teachers",
        numTeachers: getStaffRequired("crawlers", schoolData, dividedAges),
        numStudents: studentsPerProgram.crawlers[program],
      },
      toddlers: {
        message: "Toddler Room Teachers",
        numTeachers: getStaffRequired("toddlers", schoolData, dividedAges),
        numStudents: studentsPerProgram.toddlers[program],
      },
      twos: {
        message: "Twos Room Teachers",
        numTeachers: getStaffRequired("twos", schoolData, dividedAges),
        numStudents: studentsPerProgram.twos[program],
      },

      schoolTotal: { message: textOutput + " Staff Required", numTeachers: 0 },
    };
    //this has to happen after the revenue object is created
    staffPerProgram.schoolTotal.numTeachers =
      staffPerProgram.infants.numTeachers +
      staffPerProgram.crawlers.numTeachers +
      staffPerProgram.toddlers.numTeachers +
      staffPerProgram.twos.numTeachers;

    res.status(200).json({ staffPerProgram });
  } catch (error) {
    res.status(500).json({ error: "Error calculating staff per program" });
  }
};

//GET data formatted for boxplot
const getBoxPlotData = async (req, res) => {
  try {
    const classrooms = await Classroom.find();

    agesInMonths = []

    classrooms.map((classroom) => {
      let roomName = classroom.roomName
      classroom.students.map((student) => {
        newDataPoint = {}
        newDataPoint.name = roomName
        newDataPoint.value = calculateMonthsOld(student.birthdate);
        agesInMonths.push(newDataPoint)
      });
    });

    await res.status(200).json({agesInMonths});
  } catch (error) {
    res.status(404).json({ error: "Error getting data for boxplot" });
  }
};

module.exports = {
  addSchool,
  getSchool,
  updateSchool,
  getClassRevenue,
  getTotalStudents,
  getStaffRequiredCore,
  getStaffPerProgram,
  getBoxPlotData,
};
