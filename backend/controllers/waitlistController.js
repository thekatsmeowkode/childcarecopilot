const Waitlist = require("../models/WaitlistModel");

const addStudentWL = async (req, res) => {
  const {
    childName,
    parentName,
    birthdate,
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
    const waitlist = await Waitlist.find({});

    if (!waitlist) {
      return res.status(404).json({ error: "Waitlist not found" });
    }

    const newStudent = {
      childName,
      parentName,
      birthdate: new Date(birthdate),
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

module.exports = { addStudentWL, createWaitlist };
