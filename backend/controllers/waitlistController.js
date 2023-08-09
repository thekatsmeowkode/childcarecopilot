const Waitlist = require("../models/WaitlistModel");
const Classroom = require("../models/ClassModel");

CURRENT_WAITLIST_ID = "64cd36161a8b00969deefeb4";

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
      birthdate: new Date(birthdate),
      allergies,
      phone,
      startDate: new Date(startDate),
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
  const updatedStudentData = req.body;

  try {
    const waitlist = await Waitlist.findById({ _id: CURRENT_WAITLIST_ID });

    if (!waitlist) {
      return res.status(404).json({ error: "Waitlist not found" });
    }

    const studentIndex = waitlist.students.findIndex(
      (student) => student._id.toString() === studentId
    );

    console.log(studentIndex);
    waitlist.students[studentIndex] = updatedStudentData;
    console.log(waitlist);
    await waitlist.save();

    res.status(200).json(waitlist);
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
          const futureAgeInMonths =
            (futureDate.getFullYear() - student.birthdate.getFullYear()) * 12 +
            (futureDate.getMonth() - student.birthdate.getMonth());
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

module.exports = {
  addStudentWL,
  createWaitlist,
  getWaitlistStudents,
  editStudent,
  getOneStudentId,
  getNumWLStudentsByCategory,
  getStudentsOlderThanTargetDate,
  getHistogramData,
};
