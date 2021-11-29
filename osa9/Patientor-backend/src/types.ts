//diagnoosien tyypit
export interface DiagnoseEntry {
    code: string,
    name: string,
    latin?: string
}

//potilaiden tyypit
export type PatientPublic = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
  }