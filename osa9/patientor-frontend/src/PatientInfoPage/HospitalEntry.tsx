import React from "react";
import { HospitalEntry } from "../types";
import { Icon, Container } from 'semantic-ui-react';
import { useStateValue } from "../state";


export const HospitalEntryPage = (props: HospitalEntry) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Container style={{border: "1px solid", padding: "10px", margin: "2px"}}>
          <p><strong>{props.date}</strong> <Icon name="hospital outline" size="big"/></p>
          <p>Discharge date: {props.discharge.date}</p>
          <p>Discharge criteria: {props.discharge.criteria}</p>
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