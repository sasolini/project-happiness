import React from "react";
import PropTypes from "prop-types";

import S from "./Custom-button.module.scss";

const CustomButton = ({
  children,
  inverted,
  styles,
  type = "button",
  clicked,
}) => {
  const btnCn = inverted ? `${S.btn} ${S.inverted}` : S.btn;
  return (
    <button type={type} style={styles} className={btnCn} onClick={clicked}>
      {children}
    </button>
  );
};

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  inverted: PropTypes.bool,
  styles: PropTypes.object,
  clicked: PropTypes.func,
};

export default CustomButton;
