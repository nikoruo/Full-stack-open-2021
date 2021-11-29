//diagnoosien tyypit
export interface DiagnoseEntry {
    code: string,
    name: string,
    latin?: string
}

//potilaiden tyypit
export type Gender = 'male' | 'female' | 'other';

export type PatientPublic = Omit<PatientEntry, 'ssn'>;

export interface PatientEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string
}