import React from "react";
import PropTypes from "prop-types";

import S from "./Activity-button.module.scss";

const ActivityButton = ({ children, size = 4, name, done, clicked }) => {
  const wrapperClasses = done ? `${S.wrapper} ${S.inverted}` : S.wrapper;

  const wrapperStyles = {
    height: `${size}rem`,
    width: `${size}rem`,
  };
  return (
    <div
      onClick={() => clicked(name)}
      className={wrapperClasses}
      style={wrapperStyles}
    >
      {children}
    </div>
  );
};

ActivityButton.propTypes = {
  size: PropTypes.string,
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  clicked: PropTypes.func,
};

export default ActivityButton;
