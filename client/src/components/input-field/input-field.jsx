import React from "react";
import PropTypes from "prop-types";

import S from "./Input-field.module.scss";

const InputField = ({
  fieldType,
  name,
  label,
  placeholder,
  value,
  type,
  styles,
  rows = 2,
  changed,
}) => {
  if (fieldType === "input") {
    return (
      <div style={styles} className={S.inputGroup}>
        {label && <label htmlFor={name}>{label}</label>}
        <input
          onChange={changed}
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
        />
      </div>
    );
  } else if (fieldType === "textArea") {
    return (
      <div style={styles} className={S.inputGroup}>
        {label && <label for={name}>{label}</label>}
        <textarea
          onChange={changed}
          name={name}
          id={name}
          defaultValue={value}
          placeholder={placeholder}
          rows={rows}
          cols="50"
        ></textarea>
      </div>
    );
  }
};

InputField.propTypes = {
  fieldType: PropTypes.string.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.string,
  styles: PropTypes.object,
  changed: PropTypes.func,
  value: PropTypes.string,
};

export default InputField;
