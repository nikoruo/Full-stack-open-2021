
//tarvittavat muuttujat
interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

//käyttäjältä saatu syöte
interface UserInput {
  target: number;
  array: number[];
}

//eri kategoriat rating -muuttujalle
const ratingDescriptions = [
  'You didnt even try',
  'Target is not very far away!',
  'Very good!'
];

//syötteen tarkistus
const exerciseParseArguments = (args: Array<string>): UserInput => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (args.slice(2).every(a => !isNaN(Number(a)))) {
    return {
      target: Number(args[2]),
      array: args.slice(3).map(a => Number(a))
    };
  } else {
    throw new Error('Provided values were not in correct form!');
  }
};

//harjoitusten laskenta ja analysointi
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

//tarkistetaan, kutsutaanko tätä muualta, mikäli ei, suoritetaan
try {
  const { target, array } = exerciseParseArguments(process.argv);
  console.log(calculateExercises(array, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}