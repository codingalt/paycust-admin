import { Field } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import countryList from "react-select-country-list";

const SelectCountry = ({ name, className, notReq,onChange }) => {
  const options = useMemo(() => countryList().getData(), []);

  return (
    <Field
      required={notReq ? false : true}
      as="select"
      name={name}
      id={name}
      className={className}
      onChange={onChange}
    >
      <option value="">Select Country</option>
      {options?.map((country, index) => (
        <option key={index} value={country.label}>
          {country.label}
        </option>
      ))}
    </Field>
  );
};

export default SelectCountry;
