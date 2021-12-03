import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import { Icon, Container } from 'semantic-ui-react';
import { useStateValue } from "../state";


export const OccupationalHealthcarePage = (props: OccupationalHealthcareEntry) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Container style={{border: "1px solid", padding: "10px", margin: "2px"}}>
          <p><strong>{props.date}</strong> <Icon name="stethoscope" size="big"/> <strong>{props.employerName}</strong></p>
          {props.sickLeave ? <p>Sick leave start: {props.sickLeave.startDate}</p> :null}
          {props.sickLeave ? <p>Sick leave ends: {props.sickLeave.endDate}</p> : null}
          <p>{props.description}</p>
                    {props.diagnosisCodes ? 
          <ul>
            {props.diagnosisCodes.map(dc => 
              <li key={dc}>{dc} {Object.values(diagnoses).find(d => d.code === dc)?.name}</li>
            )}
          </ul>
          : null}
        </Container>
    );
};