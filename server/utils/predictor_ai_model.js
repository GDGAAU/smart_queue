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


module.exports = {
  predict
  
  };
  
