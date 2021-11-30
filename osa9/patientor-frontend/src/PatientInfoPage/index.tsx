import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Icon } from 'semantic-ui-react';

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { setPatientInfo, useStateValue } from "../state";

const PatientInfoPage = () => {
  const [{ patient }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();
  
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

  const patientGender = () => {
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

  return (
    <div className="App">
      <h2>{patient?.name} {patientGender()}</h2>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
    </div>
  );
};

export default PatientInfoPage;
