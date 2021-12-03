import React from "react";
import { HealthCheck } from "../types";
import { Icon, Container } from 'semantic-ui-react';
import { useStateValue } from "../state";


export const HealthCheckPage = (props: HealthCheck): JSX.Element => {
    const [{ diagnoses }] = useStateValue();

    const HealthCheckRatingColor = (rating: HealthCheck): JSX.Element | null => {
      
      switch(rating.healthCheckRating){
        case 0:
          return <Icon color="green" name="heartbeat" size="large"/>;
        case 1:
          return <Icon color="yellow" name="heartbeat" size="large"/>;
        case 2:
          return <Icon color="orange" name="heartbeat" size="large"/>;
        case 3:
          return <Icon color="red" name="heartbeat" size="large"/>;
        default:
          return null;
        }
      };    

    return (
        <Container style={{border: "1px solid", padding: "10px", margin: "2px"}}>
          <p><strong>{props.date}</strong> <Icon name="user md" size="big"/></p>
          <p>{props.description}</p>
                    {props.diagnosisCodes ? 
          <ul>
            {props.diagnosisCodes.map(dc => 
              <li key={dc}>{dc} {Object.values(diagnoses).find(d => d.code === dc)?.name}</li>
            )}
          </ul>
          : null}
          <HealthCheckRatingColor {...props}/>
        </Container>
    );
};