import express from 'express';

import patientService from '../services/patientService';
import toNewPatientEntry, { toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatientPublics());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findPatientInfo(req.params.id);
  
  if(patient){
    res.json(patient);
  } else{
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try{
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.addPatient(newPatientEntry);
  res.json(addedEntry);
  } catch (error: unknown){
    let errorMessage = 'Something went wrong.';
    if(error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  const patient = patientService.findPatientInfo(req.params.id);

  if(patient){
    try{
      const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntryToPatient(patient, newEntry);
    res.json(addedEntry);
  } catch (error: unknown){
    let errorMessage = 'Something went wrong.';
    if(error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
  } else {
    res.sendStatus(404);
  }
});

export default router;