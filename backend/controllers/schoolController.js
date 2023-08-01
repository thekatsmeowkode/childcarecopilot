const School = require("../models/SchoolModel");

//POST a school
const addSchool = async (req, res) => {
  const { ...form } = req.body;
  try {
    const school = await School.create({ ...form });
    res.status(200).json(school);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  res.json({ mssg: "POST the school" });
};

const getSchool = async (req, res) => {
  const school = await School.find({});
  res.status(200).json(school);
};

const updateSchool = async (req, res) => {
  await School.findByIdAndUpdate("64c84bb803361397826fd4fa", req.body),
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated User: ", docs);
      }
    };
  console.log(JSON.stringify(req.body));
};

module.exports = { addSchool, getSchool, updateSchool };
