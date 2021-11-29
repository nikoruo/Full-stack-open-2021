import patients from '../../data/patients';

import { PatientEntry, PatientPublic } from '../types';

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

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  getPatientPublics,
  addPatient
};