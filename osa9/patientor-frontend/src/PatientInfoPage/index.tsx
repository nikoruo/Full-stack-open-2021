import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Button, Icon } from 'semantic-ui-react';

import { Entry, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { setPatientInfo, useStateValue } from "../state";
import { assertNever } from "../utils";
import { HospitalEntryPage } from "./HospitalEntry";
import { OccupationalHealthcarePage } from "./OccupationalHealthCare";
import { HealthCheckPage } from "./HealthCheck";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientInfoPage = () => {
  const [{ patient }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();
  
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  React.useEffect(() => {  
    const fetchPatientInfo = async () => {

        try {
        const { data: patientInfo } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatientInfo(patientInfo));
      } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if(axios.isAxiosError(error) && error.response) {
          errorMessage += ' Error: ' + String(error.response.data.message);
        }
        console.error(errorMessage);
      }
    };

    if(!patient || patient?.id !== id){
      void fetchPatientInfo();
    }
    
  }, [id]);

  const PatientGender = () => {
    switch(patient?.gender){
        case "male":
            return <Icon name="mars" size="big"/>;
        case "female":
            return <Icon name="venus" size="big"/>;
        case "other":
            return <Icon name="genderless" size="big"/>;
        default:
            return null;
        }
    };

    const EntryDetails = (props: Entry) => {
      switch(props.type){
          case "Hospital":
              return <HospitalEntryPage {...props}/>;
          case "OccupationalHealthcare":
              return <OccupationalHealthcarePage {...props}/>;
          case "HealthCheck":
              return <HealthCheckPage {...props}/>;
          default:
              return assertNever(props);
          }
      };

      const submitNewEntry = async (values: EntryFormValues) => {
        console.log("supsupsup");
        try {
          if(patient){
            const { data: newEntry } = await axios.post<Entry>(
              `${apiBaseUrl}/patients/${patient.id}/entries`,
              values
            );
            
            dispatch(setPatientInfo({...patient, entries: patient.entries.concat(newEntry)}));
          }
          closeModal();
        } catch (e) {
          console.error(e.response?.data || 'Unknown Error');
          setError(e.response?.data?.error || 'Unknown error');
        }
      };


  return (
    <div className="App">
      <div>
        <h2>{patient?.name} {PatientGender()}</h2>
        <p>ssn: {patient?.ssn}</p>
        <p>occupation: {patient?.occupation}</p>
      </div>
      <p/>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
      {patient?.entries.length !== 0 ?
      <div>
        <h3>entries</h3>
        {patient?.entries.map(e => 
        <div key={e.id}><EntryDetails {...e}/></div>
        )}
      </div>
      :null}
    </div>
  );
};

export default PatientInfoPage;