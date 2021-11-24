import { calculateBmi } from "./bmiCalculator";
import express from 'express';
const app = express();

//T9.4
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

//T9.5
app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  let bmi;

  if (!height || !weight) {
    res.send({ error: 'malformatted parameters' })
  } else {
    try {
      bmi = String(calculateBmi(height, weight))
      res.send({ weight, height, bmi })
    } catch (_) {
      res.send({ error: 'malformatted parameters' })
    }
  }  
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});