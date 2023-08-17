const { ObjectId } = require("bson");
const Classroom = require("../models/ClassModel");
const mongoose = require("mongoose");
const moment = require('moment')

const checkIdValidity = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Classroom id does not exist" });
  }
};

function extractDateArguments(dateTimeString) {
  console.log(dateTimeString)
  const [datePart, timePart] = dateTimeString.split(' ');
  const dateParts = datePart.split('-');
  
  if (dateParts.length !== 3) {
    throw new Error('Invalid date format. Expected format: YYYY-MM-DD');
  }

  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1; // Month is zero-based in Date objects
  const day = parseInt(dateParts[2]);

  let hour = 0;
  let minute = 0;

  // if (timePart) {
  //   const [hourPart, minutePart] = timePart.split(':');
  //   hour = parseInt(hourPart);
  //   minute = parseInt(minutePart);
  // }
  console.log(year, month, day, hour, minute)
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

const findIndex = (classroom, studentId) => {
  const studentIndex = classroom.students.findIndex(
    (student) => student._id.toString() === studentId.toString()
  );

  if (studentIndex === -1) {
    throw Error("Student Index not found");
  } else {
    return studentIndex;
  }
};

//////////////////CLASSROOM routes///////////////////////
//GET all classes
const getClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find({});
    res.status(200).json(classrooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//GET class by id
const getClassroom = async (req, res) => {
  try {
    const { targetClass } = req.params;

    const classroom = await Classroom.findOne({roomName: targetClass});

    if (!classroom) {
      return res
        .status(404)
        .json({ error: "No classroom found for requested room name" });
    }

    res.status(200).json(classroom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//POST a new class
const createClassroom = async (req, res) => {
  const { roomName, students } = req.body;
  //error handling logic to make UI better for user
  let nullFields = [];

  if (!roomName) {
    nullFields.push("roomName");
  }

  if (nullFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", nullFields });
  }

  // add doc to db
  try {
    const classroom = await Classroom.create({ roomName, students });
    res.status(200).json(classroom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//DELETE a class
const deleteClassroom = async (req, res) => {
  const { roomName } = req.params;

  try {
    const classrooms = await Classroom.find({});

    const [targetClass] = classrooms.filter(
      (classroom) => classroom.roomName === roomName
    );

    const classroom = await Classroom.findOneAndDelete({
      _id: targetClass._id,
    });

    if (!classroom) {
      return res.status(400).json({ error: "Classroom id does not exist" });
    }

    res.status(200).json(classroom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//UPDATE a class
const updateClassroom = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

///////////////////STUDENT Routes///////////////////////////////
//UPDATE student from class
const updateStudent = async (req, res) => {
  const { targetClass, studentId } = req.params;

  const {
    name,
    birthdate,
    allergies,
    programs,
    phone,
    classroomName,
    incomingDataClassroomMemory,
  } = req.body;

  try {
    const oldClassroom = await Classroom.findOne({
      roomName: incomingDataClassroomMemory,
    });
    const studentIndex = findIndex(oldClassroom, studentId);

    oldClassroom.students.splice(studentIndex, 1);

    await oldClassroom.save();

    //add new student
    const classroom = await Classroom.findOne({ roomName: targetClass });

    if (!classroom) {
      return res.status(404).json({ error: "Classroom not found" });
    }

    const newStudent = {
      name,
      birthdate: extractDateArguments(birthdate),
      phone,
      allergies,
      programs,
      classroomName,
    };

    classroom.students.push(newStudent);

    await classroom.save();

    return res.json(classroom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//POST student to class
const addStudent = async (req, res) => {
  // const { targetClass } = req.params;
  const { name, birthdate, phone, allergies, programs, classroomName } =
    req.body;
  try {
    const classroom = await Classroom.findOne({ roomName: classroomName });

    if (!classroom) {
      return res.status(404).json({ error: "Classroom not found" });
    }

    const newStudent = {
      name,
      birthdate: extractDateArguments(birthdate),
      phone,
      allergies,
      programs,
      classroomName,
    };

    classroom.students.push(newStudent);
    await classroom.save();
    return res.json(classroom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//DELETE student from class
const deleteStudent = async (req, res) => {
  const { classroomName, studentId } = req.params;
  try {
    const classroom = await Classroom.findOne({ roomName: classroomName });

    if (!classroom) {
      return res.status(404).json({ error: "Class not found" });
    }

    const studentIndex = findIndex(classroom, studentId);

    classroom.students.splice(studentIndex, 1);

    await classroom.save();

    const updatedClassrooms = await Classroom.find()

    return res.status(200).json(updatedClassrooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//GET student from class
const getStudent = async (req, res) => {
  const { targetClass, studentId } = req.params;
  try {
    const classroom = await Classroom.findOne({ roomName: targetClass });

    if (!classroom) {
      res.status(400).json({ error: "Classroom does not exist" });
    }

    const studentIndex = findIndex(classroom, studentId);

    return res.status(200).json(classroom[studentIndex]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getUpcomingBirthdays = async (req, res) => {
  try {
    const classrooms = await Classroom.find({});

    if (!classrooms) {
      return res.status(404).json({ error: "Classes not found" });
    }

    const upcomingBirthdays = [];
    const currentDate = new Date();
    const upcomingWeekEnd = new Date(currentDate);
    upcomingWeekEnd.setDate(currentDate.getDate() + 7);

    function isBirthdayWithinNextWeek(birthdate) {
      const birthMonth = birthdate.getMonth();
      const birthDay = birthdate.getDate();
      const currentMonth = currentDate.getMonth();
      //the -1 related to a time zone issue
      const currentDay = currentDate.getDate() - 1;

      return (
        birthMonth === currentMonth &&
        birthDay >= currentDay &&
        birthDay <= upcomingWeekEnd.getDate()
      );
    }

    classrooms.forEach((classroom) => {
      classroom.students.forEach((student) => {
        const birthdate = new Date(student.birthdate);
        // Check if the birthdate is within the upcoming week
        const isWithinNextWeek = isBirthdayWithinNextWeek(birthdate);
        if (isWithinNextWeek) {
          upcomingBirthdays.push(student);
        }
      });
    });

    res.status(200).json({ upcomingBirthdays });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSortedAges = async (req, res) => {
  const { toSort, classroomName } = req.params

  try {
    const classroom = await Classroom.findOne({roomName:classroomName});
    if (!classroom) {
      return res.status(404).json({ error: "Waitlist not found" });
    }

    const order = req.query.order === "asc" ? 1 : -1;

    console.log(classroom.students)

    let sortedStudents = classroom.students.sort((a, b) => {
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

    console.log(sortedStudents)

    res.status(200).json({students:sortedStudents, roomName:classroomName});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createClassroom,
  getClassrooms,
  getClassroom,
  deleteClassroom,
  updateClassroom,
  updateStudent,
  addStudent,
  deleteStudent,
  getStudent,
  getUpcomingBirthdays,
  getSortedAges
};
