// Add the Calculator APIs

const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname))
app.use(express.json())

const LIMIT = 1000000;
app.get('/', (req, res) => {
  res.send('Hello World');
});

//your code here
function validateInputs(num1, num2, operationResult = null){
  if(typeof num1 !== "number" || typeof num2 !== "number"){
    return {status: "error", message: "Invalid data types"};
  }
  if(num1 > LIMIT || num2 > LIMIT || operationResult > LIMIT){
    return {status: "error", message: "Overflow"};
  }
  if (num1 < -LIMIT || num2 < -LIMIT || operationResult < -LIMIT) {
    return { status: "error", message: "Underflow" };
  }
  return null;
}

app.post("/add", (req, res) => {
  const { num1, num2 } = req.body;
  const sum = num1 + num2;

  const error = validateInputs(num1, num2, sum);
  if (error) return res.json(error);

  res.json({
    status: "success",
    message: "the sum of given two numbers",
    sum,
  });
});

app.post("/sub", (req, res) => {
  const { num1, num2 } = req.body;
  const difference = num1 - num2;

  const error = validateInputs(num1, num2, difference);
  if (error) return res.json(error);

  res.json({
    status: "success",
    message: "the difference of given two numbers",
    difference,
  });
});

app.post("/multiply", (req, res) => {
  const { num1, num2 } = req.body;
  const result = num1 * num2;

  const error = validateInputs(num1, num2, result);
  if (error) return res.json(error);

  res.json({
    status: "success",
    message: "The product of given numbers",
    result,
  });
});

app.post("/divide", (req, res) => {
  const { num1, num2 } = req.body;

  if (typeof num1 !== "number" || typeof num2 !== "number") {
    return res.json({ status: "error", message: "Invalid data types" });
  }

  if (num2 === 0) {
    return res.json({ status: "error", message: "Cannot divide by zero" });
  }

  const result = num1 / num2;
  const error = validateInputs(num1, num2, result);
  if (error) return res.json(error);

  res.json({
    status: "success",
    message: "The division of given numbers",
    result,
  });
});


module.exports = app;
