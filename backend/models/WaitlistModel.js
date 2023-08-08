const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const waitlistSchema = new Schema(
  {
    students: {
      type: Array,
      required: true,
    },
    students: [
      {
        childName: String,
        parentName: String,
        birthdate: Date,
        startDate: Date,
        allergies: String,
        phone: String,
        email: String,
        programs: Array,
        sibling: Boolean,
        emailed: Boolean,
        toured: Boolean,
        registered: Boolean,
        enrolled: Boolean,
        declined: Boolean
      },
    ],
  },
  { timeStamp: true }
);

module.exports = mongoose.model("Waitlist", waitlistSchema);
