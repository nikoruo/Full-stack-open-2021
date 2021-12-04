import {v1 as uuid} from 'uuid';

import patients from '../../data/patients';

import { PatientEntry, PatientPublic, NewPatientEntry, NewEntry, Entry } from '../types';

const getPatients = (): Array<PatientEntry> => {
  return patients;
};

const findPatientInfo = (id: string): PatientEntry | undefined => {
  return patients.find(p => p.id === id);
};

const getPatientPublics = (): PatientPublic[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
      }));
  };

const addPatient = ( entry: NewPatientEntry): PatientEntry => {
  
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };
  
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntryToPatient = (patient: PatientEntry, entry: NewEntry ): NewEntry => {
  
  const newEntry: Entry = {
    id: uuid(),
    ...entry
  };
  
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  findPatientInfo,
  getPatientPublics,
  addPatient,
  addEntryToPatient
};