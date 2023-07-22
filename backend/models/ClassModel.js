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
  },
  { timeStamp: true }
);

module.exports = mongoose.model("Classroom", classSchema);

// {
//     name: {
//         type: String,
//         required: true
//     },
//     birthday: {
//         type: Date,
//         required: true
//     },
//     classroom: {
//         type: String,
//         required: true
//     },
//     phone: {
//         type: Number,
//         required: true
//     },
//     allergies: {
//         type: String,
//         required: false
//     },
//     programs: {
//         type: Array,
//         required: true
//     }
// }, {timestamps: true}
