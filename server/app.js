require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.PORT || 5500;


//patient routes middleware
const patient = require("./app/routes/patient.routes");
app.use("/api/patient", patient);


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
