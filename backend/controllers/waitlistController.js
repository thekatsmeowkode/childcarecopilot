const Waitlist = require("../models/WaitlistModel");

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
  console.log(category)

  try {
    const waitlist = await Waitlist.findById({ _id: CURRENT_WAITLIST_ID });

    if (!waitlist) {
      return res.status(404).json({ error: "Waitlist not found" });
    }

    let counter = 0;

    waitlist.students.map((student) =>
      student[category] ? (counter += 1) : counter
    );

    res.status(200).json({ category, counter });
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
};
