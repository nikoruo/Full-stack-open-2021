
interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
};

const ratingDescriptions = [
  'You didnt even try',
  'Target is not very far away!',
  'Very good!'
];

const calculateExercises = (tDays: number[], target: number): Result => {

  const periodLength = tDays.length;
  const trainingDays = tDays.reduce((p, c) => p + (c > 0 ? 1 : 0), 0);

  const trainingHours = tDays.reduce((p, c) => p + c);
  const average = trainingHours / periodLength;

  const success = (average >= target ? true : false);

  const rating = (average >= target ? 3 : average >= target / 2 ? 2 : 1);
  const ratingDescription = ratingDescriptions[(average >= target ? 3 : average >= target / 2 ? 2 : 1)-1];

  return {
    periodLength, trainingDays, success, rating, ratingDescription, target, average
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));