
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

const calculateBmi = (height: number, weight: number): string => {

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

console.log(calculateBmi(180, 74));