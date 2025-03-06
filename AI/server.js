const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");

const app = express();
const PORT = 5000;

app.use(cors());

app.use(bodyParser.json());

app.post("/predict", (req, res) => {
    const patientData = req.body;
    console.log(patientData)

    const inputData = JSON.stringify(patientData);
    
    const pythonProcess = spawn("python3", ["predict.py", inputData]);

    let result = "";

    pythonProcess.stdout.on("data", (data) => {
        result += data.toString();
    });

    pythonProcess.on("close", (code) => {
        if (code === 0) {
            console.log(result);
            res.json({ predicted_time: Math.round(parseFloat(result)) });
        } else {
            res.status(500).json({ error: "Prediction failed" });
        }
    });
});

app.listen(PORT, () => {
});

