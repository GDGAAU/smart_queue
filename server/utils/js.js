const  { spawn } = require ("child_process");

const  predict = async (patientData) => {
  return new Promise((resolve, reject) => {
    const inputData = JSON.stringify(patientData);
    const pythonProcess = spawn("python", ["predict.py", inputData]);

    let result = "";

    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pythonProcess.on("close", (code) => {
      if (code === 0) {

        resolve(Math.round(parseFloat(result)));
    } else {
        reject("Prediction failed");
      }
    });

    pythonProcess.on("error", (err) => {
      reject(err);
    });
  });
};

predict({
  "features": [
    {
      "department_Eye": 0,
      "department_Teeth": 0,
      "department_Ear": 0,
      "department_Skin": 0,
      "department_Vaccine": 1
    }
    ]
  }).then(result => console.log(result)).catch(error => console.error(error));
