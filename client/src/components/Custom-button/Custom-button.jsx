import React from "react";
import PropTypes from "prop-types";

import S from "./Custom-button.module.scss";

const CustomButton = ({ children, inverted, styles }) => {
  const btnCn = inverted ? `${S.btn} ${S.inverted}` : S.btn;
  return (
    <button style={styles} className={btnCn}>
      {children}
    </button>
  );
};

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  inverted: PropTypes.bool,
  styles: PropTypes.object,
};

export default CustomButton;
