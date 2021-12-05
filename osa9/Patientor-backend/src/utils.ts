/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewPatientEntry, Gender, NewEntry, DiagnoseEntry, Entry, HealthCheckRating, BaseEntry } from './types';

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

  //diagnoosikoodit
  const parseDiagnosisCode = (dcodes: any): Array<DiagnoseEntry['code']> => {
    if(!dcodes) return [];
    if(!Array.isArray(dcodes)){
       throw new Error('Incorrect diagnoses codes');
    }
    
    const checkedCodeFormats = (dcodes as DiagnoseEntry[]).every((c: any) => parseString(c));

    if (checkedCodeFormats) {
      return dcodes as string[];
    } else {
      throw new Error('Incorrect diagnosis code');
    }
  };

  //tyyppi
  const parseType = (type: any): Entry["type"]=> {
    if (!type || !parseString(type)) {
        throw new Error('Incorrect or missing type');
    }

    switch(type){
      case "HealthCheck":
        return "HealthCheck";
      case "Hospital":
        return "Hospital";
      case "OccupationalHealthcare":
        return "OccupationalHealthcare";
      default: 
        throw new Error('Incorrect or missing type');
    }
  };

  //rating
  const isRating = (param: any): param is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(HealthCheckRating).includes(param);
  };

  const parseRating = (rating: any): HealthCheckRating=> {
    if (rating && isRating(rating) || rating === 0 && isRating(rating)) {
      return rating;        
    } else {
      throw new Error('missing or incorrect healthCheckRating');
    }
  };

  //dischage
    const parseDischarge = (discharge: any): {date: string, criteria: string} => {

    if (!discharge.date || !discharge.criteria) {
        throw new Error('missing discharge date or criteria');
    }
    return {
        date: parseDate(discharge.date),
        criteria: parseString(discharge.criteria)
    };
  };  

  //sickleave
  const parseSickLeave = (sleave: any): {startDate: string, endDate: string} | undefined => {
    if(!sleave) return undefined;
    if (!sleave.startDate || !sleave.endDate) {
        throw new Error('missing start or end date');
    }
    return {
      startDate: parseDate(sleave.startDate),
      endDate: parseDate(sleave.endDate)
    };
  };

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

  export const toNewEntry = (object: any): NewEntry => {
    
    const newEntry: Omit<BaseEntry, "id"> = {
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      diagnosisCodes: parseDiagnosisCode(object.diagnosisCodes)
    };
  
    const type = parseType(object.type);
    
    switch(type){
      case "HealthCheck":
        return {
          ...newEntry,
          type: "HealthCheck", 
          healthCheckRating: parseRating(object.healthCheckRating)
        };
      case "Hospital":
        return {
          ...newEntry,
          type: "Hospital", 
          discharge: parseDischarge(object.discharge)
        };
      case "OccupationalHealthcare":
        return {
          ...newEntry,
          type: "OccupationalHealthcare", 
          employerName: parseString(object.employerName),
          sickLeave: parseSickLeave(object.sickLeave)
        };
    }
  };


export default toNewPatientEntry;