const Classroom = require("../models/ClassModel");
const mongoose = require("mongoose");

const checkIdValidity = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Classroom id does not exist" });
  }
};

//get all classes
const getClassrooms = async (req, res) => {
  const classrooms = await Classroom.find({});
  res.status(200).json(classrooms);
};

//get class by id
const getClassroom = async (req, res) => {
  const { id } = req.params;

  //checks validity of id
  checkIdValidity(id);

  const classroom = await Classroom.findById(id);

  if (!classroom) {
    return res
      .status(404)
      .json({ error: "No classroom found for requested id" });
  }

  res.status(200).json(classroom);
};

//POST a new class
const createClassroom = async (req, res) => {
  const { roomName, students } = req.body;
  //error handling logic to make UI better for user
  let nullFields = []

  if (!roomName) {
    nullFields.push('roomName')
  }

  if (nullFields.length > 0) {
    return res.status(400).json({error: 'Please fill in all fields', nullFields})
  }

  // add doc to db
  try {
    const classroom = await Classroom.create({ roomName, students });
    res.status(200).json(classroom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  res.json({ mssg: "POST a new classroom" });
};

//delete a class
const deleteClassroom = async (req, res) => {
  const { id } = req.params;

  //checks validity of id
  checkIdValidity(id);

  const classroom = await Classroom.findOneAndDelete({ _id: id });

  if (!classroom) {
    return res.status(400).json({ error: "Classroom id does not exist" });
  }

  res.status(200).json(classroom);
};

//update a class
const updateClassroom = async (req, res) => {
  const { id } = req.params;

  checkIdValidity(id);

  const classroom = await Classroom.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!classroom) {
    return res.status(400).json({ error: "Classroom id does not exist" });
  }

  res.status(200).json(classroom);
};




//UPDATE student from class
const updateStudent = async (req, res) => {
    const {classId, studentId} = req.params
    const {fieldToChange, newData} = req.body

    checkIdValidity(classId)
    try {
    const classroom = await Classroom.findOne({_id: classId})

    if (!classroom) {
        return res.status(400).json({error: 'Class id does not exist'})
    }
    // find student in class's student array
    const studentIndex = classroom.students.findIndex((student) => student._id.toString() === studentId)
    //check if student exists
    if (studentIndex === -1) {
        return res.status(404).json({error: 'Student not found'})
    }

    classroom.students[studentIndex].fieldToChange = newData
    await classroom.save()
    return res.status(200).json(classroom)
}
    catch (error) {
        res.status(500).json({error: 'Internal server error'})
    }
}

//Add student to class
const addStudent = async (req, res) => {
    const {classId} = req.params;
    const {name, birthdate, phone, allergies, programs} = req.body
    try {
        const classroom = await Classroom.findOne({_id: classId})

        if (!classroom) {
            return res.status(404).json({ error: 'Classroom not found'})
        }

        const newStudent = {
            name, birthdate, phone, allergies, programs
        }

        classroom.students.push(newStudent)
        await classroom.save()
        return res.json(classroom)
    }
    catch (error) {
        res.status(500).json({error: 'Internal server error'})
    }
}

module.exports = {
  createClassroom,
  getClassrooms,
  getClassroom,
  deleteClassroom,
  updateClassroom,
  updateStudent,
  addStudent
};
