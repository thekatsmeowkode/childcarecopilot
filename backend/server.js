require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const classRoutes = require("./routes/classes");
const schoolRoutes = require("./routes/school")
const waitlistRoutes = require('./routes/waitlist')

//express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

const BASE_URL = "https://cccopilot-server.onrender.com"
//routes
app.use(BASE_URL + "/api/classes", classRoutes);
app.use(BASE_URL + '/api/school', schoolRoutes);
app.use(BASE_URL + '/api/waitlist', waitlistRoutes)

//connect to db
mongoose
  .connect(process.env.CONNECTION)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("listening on port 4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
