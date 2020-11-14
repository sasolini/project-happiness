import React from "react";
import PropTypes from "prop-types";

import S from "./input-field.module.scss";

const InputField = ({ fieldType, name, label, placeholder, styles }) => {
  if (fieldType === "input") {
    return (
      <div style={styles} className={S.inputGroup}>
        {label && <label for={name}>{label}</label>}
        <input type="text" name={name} id={name} placeholder={placeholder} />
      </div>
    );
  } else if (fieldType === "textArea") {
    return (
      <div style={styles} className={S.inputGroup}>
        {label && <label for={name}>{label}</label>}
        <textarea
          name={name}
          id={name}
          placeholder={placeholder}
          rows="4"
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
  styles: PropTypes.object,
};

export default InputField;
