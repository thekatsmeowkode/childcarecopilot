require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
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

// Set up CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
  credentials: true, // Allow cookies and headers to be sent in the request
};

app.use(cors(corsOptions));

// const BASE_URL = "https://cccopilot-server.onrender.com"
const PORT = process.env.PORT || 4000

//routes
app.use("/api/classes", classRoutes);
app.use('/api/school', schoolRoutes);
app.use('/api/waitlist', waitlistRoutes)

//connect to db
mongoose
  .connect(process.env.CONNECTION)
  .then(() => {
    //listen for requests
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
