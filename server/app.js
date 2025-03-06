require("dotenv").config();
const express = require("express");
const path = require('path');

const app = express();
const port = process.env.PORT || 5500;
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//user routes middleware
const userRoute = require("./app/routes/user.routes");
app.use("/api/users", userRoute);

//appointment routes middleware
const appointmentRoute = require("./app/routes/appointment.routes");  
app.use("/api/appointments", appointmentRoute);

//completed routes middleware
const completedRoute = require("./app/routes/complete.routes");
app.use("/api/completed", completedRoute);

async function start() {
  try {
    // const result = await dbConnection.execute("select 'test' ");
    app.listen(port);
    console.log("database connection established");
    console.log(`listening on port http://localhost:${port}`);
  } catch (error) {
    console.log(error.message);
  }
}
start();
