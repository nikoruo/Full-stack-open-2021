//diagnoosien tyypit
export interface DiagnoseEntry {
    code: string,
    name: string,
    latin?: string
}

//potilaiden tyypit
export type PatientPublic = Omit<PatientEntry, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
  }

  //Entries
  export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseEntry['code']>;
  }

  interface HospitalEntry extends BaseEntry{
    type: 'Hospital';
    discharge: {
        date: string;
        criteria: string;
    };
  }

  interface OccupationalHealthcareEntry extends BaseEntry{
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
      };
  }

  export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }

  interface HealthCheck extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating;

  }

  export type Entry =
  | HealthCheck
  | HospitalEntry
  | OccupationalHealthcareEntry;

  export type NewEntry =
  | Omit<HealthCheck, "id">
  | Omit<HospitalEntry, "id">
  | Omit<OccupationalHealthcareEntry, "id">;
  