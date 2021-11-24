//eri bmi kategoriat, lähteenä wikipedia
const bmiCategory = [
  'Severe thinness',
  'Moderate thinness',
  'Mild thinness',
  'Normal (healthy weight)',
  'Pre-obese',
  'Class I Obesity',
  'Class II Obesity',
  'Class III Obesity'
];

//tarvittavat syötteet käyttäjältä
interface Measures {
  height: number;
  weight: number;
}

//tarkistetaan käyttäjän syöte
export const bmiParseArguments = (args: Array<string>): Measures => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

//bmi laskenta ja määritys
export const calculateBmi = (height: number, weight: number): string => {

  const bmi = weight / height / height * 10000;

  if (bmi < 16) {
    return bmiCategory[0];

  } else if (bmi <= 16.9) {
    return bmiCategory[1];

  } else if (bmi <= 18.4) {
    return bmiCategory[2];

  } else if (bmi <= 24.9) {
    return bmiCategory[3];

  } else if (bmi <= 29.9) {
    return bmiCategory[4];

  } else if (bmi <= 34.9) {
    return bmiCategory[5];

  } else if (bmi <= 39.9) {
    return bmiCategory[6];

  } else if (bmi >= 40) {
    return bmiCategory[7];
  }

  return 'error';
}

//tarkistetaan, kutsutaanko tätä muualta, mikäli ei, suoritetaan
if (require.main === module) {
  try {
    const { height, weight } = bmiParseArguments(process.argv);
    console.log(calculateBmi(height, weight))
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}