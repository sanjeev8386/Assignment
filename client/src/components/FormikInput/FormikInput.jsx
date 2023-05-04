import React from "react";
import { Input, Label, Col, FormFeedback } from "reactstrap";

const FormikInput = ({
  field,
  form: { touched, errors },
  placeholder,
  type,
  label,
}) => {
  return (
    <>
      <Label className="col-sm-6 col-form-label">{label}</Label>
      <Input
        className="form-control"
        invalid={!!(touched[field.name] && errors[field.name])}
        {...field}
        placeholder={placeholder}
        type={type}
        id={`${label}-${type}`}
      />
      {touched[field.name] && errors[field.name] && (
        <FormFeedback style={{ display: "block" }}>
          {errors[field.name]}
        </FormFeedback>
      )}
    </>
  );
};

export default FormikInput;
