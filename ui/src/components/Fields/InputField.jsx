import { FieldProps } from "formik";
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";


const InputField = ({
  field,
  form: { errors, touched },
  ...props
}) => {
  const errorMessage = touched[field.name] && errors[field.name];
  return (
    <>
      <input {...field} {...props} />
      {errorMessage && errorMessage}
    </>
  );
};

export default InputField;
