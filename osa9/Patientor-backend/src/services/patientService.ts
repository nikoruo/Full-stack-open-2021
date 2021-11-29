import {v1 as uuid} from 'uuid';

import patients from '../../data/patients';

import { PatientEntry, PatientPublic, NewPatientEntry } from '../types';

const getPatients = (): Array<PatientEntry> => {
  return patients;
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

export default {
  getPatients,
  getPatientPublics,
  addPatient
};