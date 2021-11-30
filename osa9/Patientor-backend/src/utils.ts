/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewPatientEntry, Gender } from './types';

//Nimi
  const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

  const parseString = (string: unknown): string => {
    if (!string || !isString(string)) {
      throw new Error('Incorrect or missing string');
    }
  
    return string;
  };

  //pvm
  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

  const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };

//gender
  const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
  };
  
  const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
  };

  /*/entries (array, jossa string)
  const parseEntries = (param: any[]): param is string[] => {
    
  };*/

 const toNewPatientEntry = (object: any): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: []
    };
  
    return newEntry;
  };


export default toNewPatientEntry;