const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classSchema = new Schema(
  {
    roomName: {
      type: String,
      required: true,
    },
    students: {
      type: Array,
      required: true,
    },
    students: [
      {
        id: mongoose.ObjectId,
        name: String,
        birthdate: Date,
        classroomName: String,
        allergies: String,
        phone: String,
        programs: Array,
      },
    ],
  },
  { timeStamp: true }
);

module.exports = mongoose.model("Classroom", classSchema);
