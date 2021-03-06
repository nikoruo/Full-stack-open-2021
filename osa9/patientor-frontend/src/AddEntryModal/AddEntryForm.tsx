import { Field, Form, Formik } from "formik";
import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { DiagnosisSelection, NumberField, SelectField, TextField } from "../AddEntryModal/FormField";
import { useStateValue } from "../state";
import { HealthCheck } from "../types";
import { TypeOption } from "./FormField";

export type EntryFormValues = Omit<HealthCheck, "id">;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

const typeOptions: TypeOption[] = [
    { value: "HealthCheck", label: "HealthCheck" },
    { value: "Hospital", label: "Hospital" },
    { value: "OccupationalHealthcare", label: "OccupationalHealthcare" }
];


    export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();

    return (
      <Formik
      initialValues={{
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: -1,
        //employerName: "",
        //sickLeave: { startDate: "", endDate: "" },
        //discharge: { date: "", criteria: "" },
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        /*if (values.type === "HealthCheck" && !values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        if (values.type === "Hospital" && !values.discharge) {
            errors.healthCheckRating = requiredError;
          }
        if (values.type === "HealthCheck" && !values.healthCheckRating) {
           errors.healthCheckRating = requiredError;
        }*/
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
  
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <SelectField
              label="Type"
              name="type"
              options={typeOptions}
            />
            <Field
              label="healthCheckRating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
              placeholder={0}
            />
            
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
    );
  };

  export default AddEntryForm;