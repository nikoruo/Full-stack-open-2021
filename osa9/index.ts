import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import express from 'express';
const app = express();
app.use(express.json());

//T9.4
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

//T9.5
app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  let bmi: string;

  if (!height || !weight) {
    res.send({ error: 'malformatted parameters' });
  } else {
    try {
      bmi = String(calculateBmi(height, weight));
      res.send({ weight, height, bmi });
    } catch (_) {
      res.send({ error: 'malformatted parameters' });
    }
  }  
});

//T9.7
app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const dE: number[] = daily_exercises;
  
  //löytyykö syötteet
  if(!dE || !target || dE.length === 0){
    res.send({ error: "parameters missing" });
  }
  //ovatko ne oikeassa muodossa
  if(dE.find(d => isNaN(Number(d))) || isNaN(Number(target))){
    res.send({ error: "malformatted parameters" });
  }

  res.send(calculateExercises(dE, Number(target)));

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});