const School = require("../models/SchoolModel");
const Classroom = require("../models/ClassModel");

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const SCHOOL_ID = "64c84bb803361397826fd4fa";
//helper functions----------------------------------------------------

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
  //if any child is under 2 the room ratio is automatically 1:4 (8/3/23)
  if (countUnder2 > 0) {
    if (countUnder2 + countOver2 <= schoolData.ratioBirthToTwo) {
      return 1;
    }
    teacherCount += Math.floor(
      (countUnder2 + countOver2) / schoolData.ratioBirthToTwo
    );
    if ((countUnder2 + countOver2) % schoolData.ratioBirthToTwo) {
      teacherCount += 1;
    }
  }
  //if no children are under 2 the room ratio is 1:7 (8/3/23)
  else {
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
  try {
    const classrooms = await Classroom.find();

    const countPerRoom = {
      infants: 0,
      crawlers: 0,
      toddlers: 0,
      twos: 0,
      total: 0,
    };

    classrooms.forEach((classroom) => {
      const roomName = classroom.roomName;
      countPerRoom[roomName] += classroom.students.reduce((acc, student) => {
        return acc + 1;
      }, 0);
    });

    countPerRoom.total = await getNumStudents();

    return countPerRoom;
  } catch (error) {
    console.log(error);
  }
};

//------------------ROUTES------------------------------------------------
//POST a school
const addSchool = async (req, res) => {
  const { ...form } = req.body;
  try {
    const school = await School.create({ ...form });
    res.status(200).json(school);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//GET the school
const getSchool = async (req, res) => {
  try {
    const school = await School.find({});
    res.status(200).json(school);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//PATCH the school
const updateSchool = async (req, res) => {
  try {
    const school = await School.findByIdAndUpdate(SCHOOL_ID, req.body);
    console.log(school);
    res.status(200).json({ school });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
        message: "Early Morning:",
        value: schoolData.costEarlyMorning * counts.earlyMorning,
      },
      extendedDay: {
        message: "Extended Day:",
        value: schoolData.costExtendedDay * counts.extendedDay,
      },
      lateDay: {
        message: "Late Day:",
        value: schoolData.costLateDay * counts.lateDay,
      },
      schoolTotal: { message: "School Monthly:", value: 0 },
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
      title: "Core Hours",
      infants: {
        message: "Infants",
        numTeachers: getStaffRequired("infants", schoolData, dividedAges),
        numStudents: studentCount.infants,
      },
      crawlers: {
        message: "Crawlers",
        numTeachers: getStaffRequired("crawlers", schoolData, dividedAges),
        numStudents: studentCount.crawlers,
      },
      toddlers: {
        message: "Toddlers",
        numTeachers: getStaffRequired("toddlers", schoolData, dividedAges),
        numStudents: studentCount.toddlers,
      },
      twos: {
        message: "Twos",
        numTeachers: getStaffRequired("twos", schoolData, dividedAges),
        numStudents: studentCount.twos,
      },

      schoolTotal: { message: "Total", numTeachers: 0 },
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
      title: textOutput,
      infants: {
        message: "Infants",
        numTeachers: getStaffRequired("infants", schoolData, dividedAges),
        numStudents: studentsPerProgram.infants[program],
      },
      crawlers: {
        message: "Crawlers",
        numTeachers: getStaffRequired("crawlers", schoolData, dividedAges),
        numStudents: studentsPerProgram.crawlers[program],
      },
      toddlers: {
        message: "Toddlers",
        numTeachers: getStaffRequired("toddlers", schoolData, dividedAges),
        numStudents: studentsPerProgram.toddlers[program],
      },
      twos: {
        message: "Twos",
        numTeachers: getStaffRequired("twos", schoolData, dividedAges),
        numStudents: studentsPerProgram.twos[program],
      },

      schoolTotal: { message: "Total", numTeachers: 0 },
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

    agesInMonths = [];

    classrooms.map((classroom) => {
      let roomName = classroom.roomName;
      classroom.students.map((student) => {
        newDataPoint = {};
        newDataPoint.name = roomName;
        newDataPoint.value = calculateMonthsOld(student.birthdate);
        agesInMonths.push(newDataPoint);
      });
    });

    res.status(200).json({ agesInMonths });
  } catch (error) {
    res.status(500).json({ error: "Error getting data for boxplot" });
  }
};

const getSchoolCapacity = async (req, res) => {
  try {
    const schoolData = await School.findOne({});

    if (!schoolData) {
      return res.status(404).json({ error: "School data not found" });
    }

    const roomCapacities = {
      infantsCap: 0,
      toddlersCap: 0,
      crawlersCap: 0,
      twosCap: 0,
      totalCap: 0,
    };

    const numStudentsPerClass = await getNumStudentsByClass();

    const {
      squareFootageInfants,
      squareFootageCrawlers,
      squareFootageToddlers,
      squareFootageTwos,
      squareFootageCrib,
      squareFootageNoCrib,
    } = schoolData;

    //The infant room is the only room constrained by crib square footage
    roomCapacities.infantsCap = Math.floor(
      squareFootageInfants / squareFootageCrib
    );

    roomCapacities.toddlersCap = Math.floor(
      squareFootageToddlers / squareFootageNoCrib
    );

    roomCapacities.crawlersCap = Math.floor(
      squareFootageCrawlers / squareFootageNoCrib
    );

    roomCapacities.twosCap = Math.floor(
      squareFootageTwos / squareFootageNoCrib
    );
    roomCapacities.totalCap =
      roomCapacities.infantsCap +
      roomCapacities.crawlersCap +
      roomCapacities.toddlersCap +
      roomCapacities.twosCap;

    res.status(200).json({ roomCapacities, numStudentsPerClass });
  } catch (error) {
    res.status(500).json({ error: "Error getting data for school capacity" });
  }
};

const getFoodRequirements = async (req, res) => {
  try {
    let studentCount = 0;
    const classrooms = await Classroom.find();
    const schoolData = await School.findOne();

    const {
      oneTo3SnackGrains,
      oneTo3SnackProtein,
      oneTo3SnackMilk,
      oneTo3SnackVegFruit,
    } = schoolData;
    //values multiplied by 2 because 2 snacks daily
    let foodRequired = {
      title: "Food Required @ Snack",
      grains: {
        label: "Grains",
        measurement: "oz.",
        value: oneTo3SnackGrains * studentCount * 2,
      },
      milk: {
        label: "Milk",
        measurement: "oz.",
        value: oneTo3SnackMilk * studentCount * 2,
      },
      protein: {
        label: "Protein",
        measurement: "oz.",
        value: oneTo3SnackProtein * studentCount * 2,
      },
      vegFruit: {
        label: "Veg/Fruit",
        measurement: "oz.",
        value: 0,
      },
    };

    const today = new Date();

    classrooms.forEach((classroom) => {
      classroom.students.forEach((student) => {
        const differenceInDays = Math.floor(
          (today - student.birthdate) / MS_PER_DAY
        );
        //1095 is the number of days in 2 years
        //this checks if student is between 1 and 3 years old
        if (differenceInDays < 1095 && differenceInDays > 365) {
          studentCount += 1;
        }
      });
    });

    foodRequired.vegFruit.value = oneTo3SnackVegFruit * studentCount * 2;
    foodRequired.protein.value = oneTo3SnackProtein * studentCount * 2;
    foodRequired.grains.value = oneTo3SnackGrains * studentCount * 2;
    foodRequired.milk.value = oneTo3SnackMilk * studentCount * 2;

    res.status(200).json(foodRequired);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
  getSchoolCapacity,
  getFoodRequirements,
};
