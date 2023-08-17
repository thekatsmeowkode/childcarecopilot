const Waitlist = require("../models/WaitlistModel");
const Classroom = require("../models/ClassModel");
const moment = require('moment')

CURRENT_WAITLIST_ID = "64cd36161a8b00969deefeb4";

function extractDateArguments(dateTimeString) {
  console.log(dateTimeString);
  const [datePart, timePart] = dateTimeString.split(" ");
  const dateParts = datePart.split("-");

  if (dateParts.length !== 3) {
    throw new Error("Invalid date format. Expected format: YYYY-MM-DD");
  }

  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1; // Month is zero-based in Date objects
  const day = parseInt(dateParts[2]);

  let hour = 0;
  let minute = 0;

  if (timePart) {
    const [hourPart, minutePart] = timePart.split(":");
    hour = parseInt(hourPart);
    minute = parseInt(minutePart);
  }

  console.log(year, month, day, hour, minute);
  return new Date(year, month, day, hour, minute);
}

function calculateAge(birthdate) {
  const today = moment();
  const birthMoment = moment(birthdate);

  const years = today.diff(birthMoment, "years");
  birthMoment.add(years, "years");

  const months = today.diff(birthMoment, "months");
  birthMoment.add(months, "months");

  const days = today.diff(birthMoment, "days");

  return { years, months, days };
}

const addStudentWL = async (req, res) => {
  const {
    childName,
    parentName,
    birthdate,
    startDate,
    allergies,
    phone,
    email,
    programs,
    sibling,
    emailed,
    toured,
    registered,
    enrolled,
    declined,
  } = req.body;
  try {
    const waitlist = await Waitlist.findById({ _id: CURRENT_WAITLIST_ID });

    if (!waitlist) {
      return res.status(404).json({ error: "Waitlist not found" });
    }

    const newStudent = {
      childName,
      parentName,
      birthdate: extractDateArguments(birthdate),
      allergies,
      phone,
      startDate: extractDateArguments(startDate),
      email,
      programs,
      sibling,
      emailed,
      toured,
      registered,
      enrolled,
      declined,
    };

    waitlist.students.push(newStudent);
    await waitlist.save();
    return res.json(waitlist);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createWaitlist = async (req, res) => {
  const { ...form } = req.body;
  try {
    const waitlist = await Waitlist.create({ ...form });
    res.status(200).json(waitlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getWaitlistStudents = async (req, res) => {
  try {
    const waitlist = await Waitlist.findById({ _id: CURRENT_WAITLIST_ID });

    if (!waitlist) {
      return res.status(404).json({ error: "Waitlist not found" });
    }

    res.status(200).json(waitlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editStudent = async (req, res) => {
  const { studentId } = req.params;
  const {
    childName,
    parentName,
    birthdate,
    allergies,
    phone,
    startDate,
    email,
    programs,
    sibling,
    emailed,
    toured,
    registered,
    enrolled,
    declined,
  } = req.body;

  try {
    const waitlist = await Waitlist.findById({ _id: CURRENT_WAITLIST_ID });

    if (!waitlist) {
      return res.status(404).json({ error: "Waitlist not found" });
    }

    const studentIndex = waitlist.students.findIndex(
      (student) => student._id.toString() === studentId
    );

    const newStudent = {
      childName,
      parentName,
      birthdate: extractDateArguments(birthdate),
      allergies,
      phone,
      startDate: extractDateArguments(startDate),
      email,
      programs,
      sibling,
      emailed,
      toured,
      registered,
      enrolled,
      declined,
    };

    waitlist.students[studentIndex] = newStudent;
    await waitlist.save();

    res.status(200).json(waitlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    const waitlist = await Waitlist.findById(CURRENT_WAITLIST_ID);

    if (!waitlist) {
      return res.status(404).json({ error: "Waitlist not found" });
    }

    const studentIndex = waitlist.students.findIndex(
      (student) => student._id.toString() === studentId
    );

    if (studentIndex === -1) {
      return res.status(404).json({ error: "Student not found" });
    }

    waitlist.students.splice(studentIndex, 1);
    await waitlist.save();

    return res.status(200).json(waitlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOneStudentId = async (req, res) => {
  const { studentName } = req.params;

  try {
    const waitlist = await Waitlist.findOne({ _id: CURRENT_WAITLIST_ID });

    if (!waitlist) {
      res.status(400).json({ error: "Waitlist does not exist" });
    }

    targetStudentIndex = waitlist.students.findIndex(
      (student) => student.childName === studentName
    );

    if (targetStudentIndex === -1) {
      res.status(404).json({ error: "student not found" });
    }

    studentId = waitlist.students[targetStudentIndex]._id;

    return res.status(200).json(studentId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getNumWLStudentsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const waitlist = await Waitlist.findById({ _id: CURRENT_WAITLIST_ID });

    if (!waitlist) {
      return res.status(404).json({ error: "Waitlist not found" });
    }

    let count = 0;

    waitlist.students.map((student) =>
      student[category] ? (count += 1) : count
    );

    res.status(200).json({ category, count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//GET students older than target date from each class
const getStudentsOlderThanTargetDate = async (req, res) => {
  const { inputMonthsOld, selectedDate } = req.params;
  const targetDate = new Date(selectedDate);

  try {
    const classrooms = await Classroom.find({});

    if (!classrooms) {
      return res.status(404).json({ error: "No classrooms found" });
    }

    const isChildOlder = (classrooms, futureDate, inputMonthsOld) => {
      results = [];

      classrooms.map((classroom) => {
        classroom.students.map((student) => {
          let futureAgeInMonths =
            (futureDate.getFullYear() - student.birthdate.getFullYear()) * 12 +
            (futureDate.getMonth() - student.birthdate.getMonth());
          if (futureDate.getDate() < student.birthdate.getDate()) {
            futureAgeInMonths -= 1;
          }
          if (futureAgeInMonths > inputMonthsOld) {
            const studentWithAge = {
              birthdate: student.birthdate,
              classroomName: student.classroomName,
              name: student.name,
              futureAgeInMonths,
            };
            results.push(studentWithAge);
          }
        });
      });
      return results;
    };

    const targetChildren = isChildOlder(classrooms, targetDate, inputMonthsOld);

    res.status(200).json({ targetChildren });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//GET data formatted for histogram
const getHistogramData = async (req, res) => {
  let { selectedDate } = req.params;
  selectedDate = new Date(selectedDate);

  const getMonthsOld = (selectedDate, birthdate) => {
    const selectedYear = selectedDate.getFullYear();
    const selectedMonth = selectedDate.getMonth();
    const birthYear = birthdate.getFullYear();
    const birthMonth = birthdate.getMonth();
    return (selectedYear - birthYear) * 12 + (selectedMonth - birthMonth);
  };

  try {
    const classrooms = await Classroom.find();

    const agesInMonthsEnrolled = [];
    const agesInMonthsWaitlist = [];

    classrooms.forEach((classroom) => {
      classroom.students.forEach((student) => {
        const ageInMonths = getMonthsOld(selectedDate, student.birthdate);
        agesInMonthsEnrolled.push(ageInMonths);
      });
    });

    const waitlist = await Waitlist.findById({ _id: CURRENT_WAITLIST_ID });

    if (!waitlist) {
      return res.status(404).json({ error: "Waitlist not found" });
    }

    waitlist.students.forEach((student) => {
      const ageInMonths = getMonthsOld(selectedDate, student.birthdate);
      agesInMonthsWaitlist.push(ageInMonths);
    });

    res.status(200).json([
      { group: "enrolled", values: agesInMonthsEnrolled },
      { group: "waitlist", values: agesInMonthsWaitlist },
    ]);
  } catch (error) {
    res.status(500).json({ error: "Error getting data for boxplot" });
  }
};

const getSortedAges = async (req, res) => {
  const { toSort } = req.params

  try {
    const waitlist = await Waitlist.findById({ _id: CURRENT_WAITLIST_ID });

    if (!waitlist) {
      return res.status(404).json({ error: "Waitlist not found" });
    }

    const order = req.query.order === "asc" ? 1 : -1;

    let sortedStudents = waitlist.students.sort((a, b) => {
      const ageA = calculateAge(a[toSort]);
      const ageB = calculateAge(b[toSort]);

      if (ageA.years !== ageB.years) {
        return order * (ageA.years - ageB.years);
      }
      if (ageA.months !== ageB.months) {
        return order * (ageA.months - ageB.months);
      }
      return order * (ageA.days - ageB.days);
    });

    res.status(200).json({students:sortedStudents});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addStudentWL,
  createWaitlist,
  getWaitlistStudents,
  editStudent,
  getOneStudentId,
  getNumWLStudentsByCategory,
  getStudentsOlderThanTargetDate,
  getHistogramData,
  deleteStudent,
  getSortedAges
};
